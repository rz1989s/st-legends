#!/usr/bin/env python3
"""Capture screenshots of all 10 ST Legends templates from the live site."""

from playwright.sync_api import sync_playwright
import os

TEMPLATES = [
    "constellation",
    "trading-cards",
    "trophy-wall",
    "timeline",
    "leaderboard",
    "museum",
    "minimalist",
    "glassmorphism",
    "brutalist",
    "retro-arcade",
]

BASE_URL = "https://st-legends.rectorspace.com"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "screenshots")

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Desktop viewport for consistent screenshots
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            device_scale_factor=1,
        )
        page = context.new_page()

        for template in TEMPLATES:
            url = f"{BASE_URL}/{template}"
            output_path = os.path.join(OUTPUT_DIR, f"{template}.png")

            print(f"Capturing {template}...")
            page.goto(url)
            page.wait_for_load_state("networkidle")
            # Extra wait for animations to settle
            page.wait_for_timeout(1500)

            page.screenshot(path=output_path, full_page=False)
            print(f"  Saved: {output_path}")

        browser.close()
        print(f"\nDone! {len(TEMPLATES)} screenshots saved to {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
