# izzyLabs static website

This replaces the previous Next.js application with the ChatGPT Studio Concept v33 (source commit a535f9a59f0c8d0a0baa084172026a0998561f2b).

Vercel serves `dist/` directly. No build or dependency installation is required. The previous application remains available in the parent commit and Git history.

Project routes use URL fragments. All images, motion scripts, video and bundled Three.js files are included. Fonts retain the existing external font loading and fallback stacks. Contact enquiries use the existing FormSubmit integration; any provider activation must be completed by the mailbox owner. Glow and Lami Nepal concept phone screens are labelled illustrative.

To preview locally: run a static HTTP server with `dist` as its document root.
