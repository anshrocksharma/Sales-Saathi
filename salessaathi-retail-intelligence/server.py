#!/usr/bin/env python3
"""
SalesSaathi Retail Intelligence - Local Development & Preview Web Server
Serves the web application on http://localhost:8080 with auto-reconnect and mime-type handling.
"""

import http.server
import socketserver
import os
import sys
import webbrowser

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable caching headers and CORS for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def main():
    os.chdir(DIRECTORY)
    port = PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), CustomHandler) as httpd:
                print("=" * 65)
                print("  SalesSaathi Retail Intelligence - Executive Precision App")
                print("=" * 65)
                print(f"  Server running at:  http://localhost:{port}/")
                print(f"  Root directory:     {DIRECTORY}")
                print("=" * 65)
                print("  Press Ctrl+C to stop the server.")
                print("=" * 65)
                try:
                    webbrowser.open(f"http://localhost:{port}/")
                except Exception:
                    pass
                httpd.serve_forever()
                break
        except OSError as e:
            if "Address already in use" in str(e) or e.errno == 98 or e.errno == 10048:
                port += 1
            else:
                raise

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nSalesSaathi server stopped.")
        sys.exit(0)
