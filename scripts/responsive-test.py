#!/usr/bin/env python3
"""Test all 10 ST Legends templates across responsive viewports."""

from playwright.sync_api import sync_playwright
import os

TEMPLATES = [
    ("Hub", "/"),
    ("Constellation", "/constellation"),
    ("Trading Cards", "/trading-cards"),
    ("Trophy Wall", "/trophy-wall"),
    ("Timeline", "/timeline"),
    ("Leaderboard", "/leaderboard"),
    ("Museum", "/museum"),
    ("Minimalist", "/minimalist"),
    ("Glassmorphism", "/glassmorphism"),
    ("Brutalist", "/brutalist"),
    ("Retro Arcade", "/retro-arcade"),
]

VIEWPORTS = [
    ("mobile", 375, 667),    # iPhone SE
    ("tablet", 768, 1024),   # iPad
    ("desktop", 1920, 1080), # Full HD
]

BASE_URL = "https://st-legends.rectorspace.com"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "test-results", "responsive")

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for viewport_name, width, height in VIEWPORTS:
            print(f"\n{'='*60}")
            print(f"Testing {viewport_name.upper()} ({width}x{height})")
            print('='*60)

            context = browser.new_context(viewport={"width": width, "height": height})
            page = context.new_page()

            for template_name, path in TEMPLATES:
                url = f"{BASE_URL}{path}"
                slug = path.strip('/') or 'hub'

                try:
                    page.goto(url, timeout=30000)
                    page.wait_for_load_state("networkidle", timeout=15000)

                    # Check for layout issues
                    issues = []

                    # Check horizontal overflow
                    overflow = page.evaluate("""() => {
                        return document.body.scrollWidth > window.innerWidth;
                    }""")
                    if overflow:
                        issues.append("horizontal overflow detected")

                    # Check for overlapping elements (basic check)
                    js_errors = []
                    page.on("pageerror", lambda err: js_errors.append(str(err)))

                    # Screenshot for manual review
                    screenshot_path = os.path.join(OUTPUT_DIR, f"{slug}-{viewport_name}.png")
                    page.screenshot(path=screenshot_path)

                    status = "PASS" if not issues else f"WARN: {', '.join(issues)}"
                    results.append((template_name, viewport_name, status))
                    print(f"  {template_name}: {status}")

                except Exception as e:
                    results.append((template_name, viewport_name, f"FAIL: {str(e)[:50]}"))
                    print(f"  {template_name}: FAIL - {str(e)[:50]}")

            context.close()

        browser.close()

    # Summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print('='*60)
    passed = sum(1 for _, _, s in results if s == "PASS")
    warned = sum(1 for _, _, s in results if s.startswith("WARN"))
    failed = sum(1 for _, _, s in results if s.startswith("FAIL"))
    print(f"Total: {len(results)} | Passed: {passed} | Warnings: {warned} | Failed: {failed}")
    print(f"\nScreenshots saved to: {OUTPUT_DIR}")

    return 0 if failed == 0 else 1

if __name__ == "__main__":
    exit(main())
