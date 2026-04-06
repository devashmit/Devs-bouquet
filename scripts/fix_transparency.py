"""
Fix PNG Transparency — Remove baked-in checkerboard patterns.

AI image generators sometimes render the "transparency indicator" checkerboard
as actual pixel data instead of true alpha. This script detects those patterns
and replaces them with real RGBA transparency.

Uses only Pillow (no numpy dependency).
"""

import os
import sys
import shutil
from pathlib import Path
from collections import deque
from PIL import Image, ImageFilter


def is_near_grey(r, g, b, tolerance=22):
    """Check if a pixel is near-neutral grey/white (all channels similar and bright)."""
    avg = (r + g + b) / 3
    if avg < 155:
        return False
    spread = max(r, g, b) - min(r, g, b)
    return spread < tolerance


def remove_checkerboard(img_path, output_path):
    """Remove checkerboard background and replace with true alpha."""
    print(f"  Processing: {os.path.basename(img_path)}")
    
    img = Image.open(img_path).convert("RGBA")
    w, h = img.size
    pixels = img.load()
    
    # Step 1: Mark all pixels that look like checkerboard grey/white
    checker_mask = [[False] * w for _ in range(h)]
    
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 200 and is_near_grey(r, g, b):
                checker_mask[y][x] = True
    
    # Step 2: Flood fill from edges — only connected grey/white regions are background
    visited = [[False] * w for _ in range(h)]
    background = [[False] * w for _ in range(h)]
    queue = deque()
    
    # Seed from edge pixels that match checkerboard colors
    for x in range(w):
        if checker_mask[0][x] and not visited[0][x]:
            queue.append((0, x))
            visited[0][x] = True
        if checker_mask[h-1][x] and not visited[h-1][x]:
            queue.append((h-1, x))
            visited[h-1][x] = True
    for y in range(h):
        if checker_mask[y][0] and not visited[y][0]:
            queue.append((y, 0))
            visited[y][0] = True
        if checker_mask[y][w-1] and not visited[y][w-1]:
            queue.append((y, w-1))
            visited[y][w-1] = True
    
    # BFS flood fill through connected checker-colored pixels
    directions = [(-1,0),(1,0),(0,-1),(0,1),(-1,-1),(-1,1),(1,-1),(1,1)]
    while queue:
        y, x = queue.popleft()
        background[y][x] = True
        
        for dy, dx in directions:
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny][nx]:
                visited[ny][nx] = True
                r, g, b, a = pixels[nx, ny]
                if checker_mask[ny][nx] or (a > 200 and is_near_grey(r, g, b, tolerance=18)):
                    queue.append((ny, nx))
    
    # Step 3: Create alpha mask image
    alpha_img = Image.new("L", (w, h), 255)
    alpha_pixels = alpha_img.load()
    
    removed_count = 0
    for y in range(h):
        for x in range(w):
            if background[y][x]:
                alpha_pixels[x, y] = 0
                removed_count += 1
    
    # Step 4: Soften edges — slight erosion then gaussian blur for anti-aliasing
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(3))
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.2))
    
    # Step 5: Apply the computed alpha to the image
    result = img.copy()
    result_pixels = result.load()
    alpha_pixels = alpha_img.load()
    
    for y in range(h):
        for x in range(w):
            r, g, b, old_a = result_pixels[x, y]
            new_a = min(old_a, alpha_pixels[x, y])
            result_pixels[x, y] = (r, g, b, new_a)
    
    result.save(output_path, "PNG")
    
    pct = 100 * removed_count / (w * h)
    print(f"    Size: {w}x{h} — Removed {removed_count:,} bg pixels ({pct:.1f}%)")
    print(f"    Saved: {os.path.basename(output_path)}")


def main():
    flowers_dir = Path(__file__).resolve().parent.parent / "public" / "assets" / "flowers"
    
    if not flowers_dir.exists():
        print(f"Error: Flowers directory not found: {flowers_dir}")
        sys.exit(1)
    
    # Create backup
    backup_dir = flowers_dir / "originals_backup"
    backup_dir.mkdir(exist_ok=True)
    
    png_files = sorted(flowers_dir.glob("*.png"))
    if not png_files:
        print("No PNG files found.")
        sys.exit(1)
    
    print(f"Found {len(png_files)} PNG files to fix:\n")
    
    for png_path in png_files:
        backup_path = backup_dir / png_path.name
        if not backup_path.exists():
            shutil.copy2(png_path, backup_path)
            print(f"  Backed up: {png_path.name}")
        
        remove_checkerboard(str(png_path), str(png_path))
        print()
    
    print(f"✅ Done! {len(png_files)} images now have real alpha transparency.")
    print(f"   Originals backed up in: {backup_dir}")


if __name__ == "__main__":
    main()
