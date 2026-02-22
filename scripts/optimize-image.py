"""
Optimize Aleksandr.jpg for web
Requires: pip install Pillow
"""

from PIL import Image
import os

# Paths
BASE_DIR = r"C:\Users\37525\Desktop\upwork\projects\AleksandrAndreew-Dev.github.io"
SOURCE = os.path.join(BASE_DIR, "assets", "images", "Aleksandr.jpg")
OUTPUT_JPG = os.path.join(BASE_DIR, "assets", "images", "Aleksandr-optimized.jpg")
OUTPUT_WEBP = os.path.join(BASE_DIR, "assets", "images", "Aleksandr.webp")

def get_size_kb(path):
    return os.path.getsize(path) / 1024

def optimize_image():
    print(f"Original size: {get_size_kb(SOURCE):.2f} KB")
    
    # Open image
    with Image.open(SOURCE) as img:
        # Convert to RGB if necessary (for PNG with transparency)
        if img.mode in ('RGBA', 'LA', 'P'):
            img = img.convert('RGB')
        
        # Resize (max 800x800, maintain aspect ratio)
        img.thumbnail((800, 800), Image.Resampling.LANCZOS)
        
        # Save as optimized JPG
        img.save(OUTPUT_JPG, 'JPEG', quality=85, optimize=True, progressive=True)
        print(f"Optimized JPG: {get_size_kb(OUTPUT_JPG):.2f} KB")
        
        # Save as WebP
        img.save(OUTPUT_WEBP, 'WEBP', quality=80)
        print(f"WebP: {get_size_kb(OUTPUT_WEBP):.2f} KB")
    
    # Calculate savings
    orig = get_size_kb(SOURCE)
    jpg_savings = (1 - get_size_kb(OUTPUT_JPG)/orig) * 100
    webp_savings = (1 - get_size_kb(OUTPUT_WEBP)/orig) * 100
    
    print(f"\nJPG savings: {jpg_savings:.1f}%")
    print(f"WebP savings: {webp_savings:.1f}%")
    print(f"\nFiles created:")
    print(f"  - {OUTPUT_JPG}")
    print(f"  - {OUTPUT_WEBP}")
    print(f"\nTo use WebP, update _config.yml:")
    print(f"  author-image: /assets/images/Aleksandr.webp")

if __name__ == "__main__":
    try:
        optimize_image()
    except ImportError:
        print("Pillow not installed. Run: pip install Pillow")
    except Exception as e:
        print(f"Error: {e}")
