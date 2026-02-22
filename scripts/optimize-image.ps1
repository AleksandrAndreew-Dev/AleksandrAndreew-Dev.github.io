# Script to optimize Aleksandr.jpg for web
# Requires ImageMagick: https://imagemagick.org/

$ErrorActionPreference = "Stop"

$sourceImage = "C:\Users\37525\Desktop\upwork\projects\AleksandrAndreew-Dev.github.io\assets\images\Aleksandr.jpg"
$outputImage = "C:\Users\37525\Desktop\upwork\projects\AleksandrAndreew-Dev.github.io\assets\images\Aleksandr-optimized.jpg"
$outputWebp = "C:\Users\37525\Desktop\upwork\projects\AleksandrAndreew-Dev.github.io\assets\images\Aleksandr.webp"

# Check if ImageMagick is installed
try {
    $magickPath = Get-Command magick -ErrorAction Stop
    Write-Host "ImageMagick found: $($magickPath.Source)"
} catch {
    Write-Host "ImageMagick not found!"
    Write-Host "Install from: https://imagemagick.org/script/download.php"
    Write-Host "Or use: winget install ImageMagick.App"
    exit 1
}

# Get original file size
$originalSize = (Get-Item $sourceImage).Length / 1KB
Write-Host "Original image size: $([math]::Round($originalSize, 2)) KB"

# Optimize to JPG (800x800, quality 85%)
Write-Host "Optimizing to JPG..."
magick $sourceImage -quality 85 -resize 800x800 $outputImage
$optimizedSize = (Get-Item $outputImage).Length / 1KB
Write-Host "Optimized JPG size: $([math]::Round($optimizedSize, 2)) KB"
Write-Host "Savings: $([math]::Round((1 - $optimizedSize/$originalSize) * 100, 1))%"

# Convert to WebP (better compression)
Write-Host "Converting to WebP..."
magick $sourceImage -quality 80 -resize 800x800 $outputWebp
$webpSize = (Get-Item $outputWebp).Length / 1KB
Write-Host "WebP size: $([math]::Round($webpSize, 2)) KB"
Write-Host "Savings: $([math]::Round((1 - $webpSize/$originalSize) * 100, 1))%"

Write-Host "Done! Files created:"
Write-Host "  - $outputImage"
Write-Host "  - $outputWebp"
Write-Host "To use WebP, update _config.yml:"
Write-Host "  author-image: /assets/images/Aleksandr.webp"
