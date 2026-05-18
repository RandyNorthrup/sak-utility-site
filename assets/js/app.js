const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
    });

    const latestReleaseApi = 'https://api.github.com/repos/RandyNorthrup/S.A.K.-Utility/releases/latest';
    const latestDownloadLinks = document.querySelectorAll('[data-download-latest]');
    const latestReleaseBadge = document.getElementById('latestReleaseBadge');
    const latestReleasePromise = fetch(latestReleaseApi, {
        headers: { Accept: 'application/vnd.github+json' }
    })
        .then((response) => response.json());

    const latestDownloadUrlPromise = latestReleasePromise.then((release) => {
        const assets = Array.isArray(release.assets) ? release.assets : [];
        const asset = assets.find((item) => /^SAK-Utility-.*Windows-x64\.zip$/i.test(item.name))
            || assets.find((item) => /Windows-x64\.zip$/i.test(item.name))
            || assets.find((item) => /\.zip$/i.test(item.name));

        return asset.browser_download_url;
    });

    function updateLatestDownloadLinks(downloadUrl) {
        latestDownloadLinks.forEach((link) => {
            link.href = downloadUrl;
        });
    }

    latestDownloadUrlPromise.then(updateLatestDownloadLinks);

    latestReleasePromise.then((release) => {
        latestReleaseBadge.textContent = `${release.tag_name} - Latest Release`;
    });

    latestDownloadLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            latestDownloadUrlPromise.then((downloadUrl) => {
                window.location.href = downloadUrl;
            });
        });
    });

    const screenshotPath = 'screenshots/webp/';
    const thumbnailPath = 'screenshots/thumbs/';
    const screenshotWorkspaces = [
        {
            label: 'AI',
            eyebrow: 'Technician assistant',
            title: 'Run technician jobs with S.A.K. AI',
            description: 'Use the OpenAI-powered assistant to perform technician workflows, attach instructions and skills, execute approved local actions, and generate artifacts or reports under explicit access controls.',
            details: [
                'Chat workspace built for PC technician workflows',
                'Configurable model, persona, workflow, and reasoning effort',
                'Artifacts, reports, and command approval states for controlled local execution'
            ],
            tags: ['OpenAI', 'Workflows', 'Skills', 'Artifacts', 'Approval'],
            shots: [
                ['Assistant panel', 'ai_assistant_panel_main.webp', 'AI Assistant workspace showing technician chat and session controls', 1201, 831],
                ['Workflow context', 'ai_assistant_workflow_context.webp', 'AI Assistant workspace showing workflow instructions and skill attachments', 1200, 903]
            ]
        },
        {
            label: 'Backup',
            eyebrow: 'Migration and recovery',
            title: 'Guided profile backup and restore',
            description: 'Move Windows user profiles with structured backup and restore wizards, permission handling, BitLocker key capture, and quick documentation tools.',
            details: [
                'Smart filtering, AES-256 encryption, and NTFS permission handling',
                'Screenshot settings and BitLocker key backup',
                'Guided backup and restore wizards'
            ],
            tags: ['AES-256', 'NTFS', 'BitLocker', 'Wizards'],
            shots: [
                ['Main panel', 'backup_restore_panel_main.webp', 'Backup and Restore workspace showing backup and restore profile cards', 1203, 833],
                ['Backup wizard', 'backup_wizard.webp', 'Backup wizard screenshot', 701, 678],
                ['Restore wizard', 'restore_wizard.webp', 'Restore wizard screenshot', 900, 731]
            ]
        },
        {
            label: 'Imaging',
            eyebrow: 'Boot media',
            title: 'Flash images and build install media',
            description: 'Flash disk images to USB, build Windows install media, and pull Linux ISOs from a built-in distro catalog.',
            details: [
                'Supports ISO, IMG, WIC, ZIP, GZ, BZ2, XZ, DMG, and DSK',
                'Windows ISO creation through the UUP builder',
                'UEFI boot support for deployment media'
            ],
            tags: ['ISO', 'IMG', 'UEFI', 'Linux', '9 formats'],
            shots: [
                ['Image choices', 'image_flasher_main_panel.webp', 'Image Flasher workspace with Windows, UUP, and Linux ISO options', 1203, 834],
                ['Flash setup', 'image_flasher_main_panel_2.webp', 'Image flasher target selection screenshot', 1198, 1031],
                ['Linux downloader', 'image_flasher_linux_downloader.webp', 'Linux ISO downloader screenshot', 783, 712],
                ['UUP ISO builder', 'image_flasher_uup_iso_builder.webp', 'UUP ISO builder screenshot', 719, 942]
            ]
        },
        {
            label: 'Diagnostics',
            eyebrow: 'Testing and reporting',
            title: 'Benchmark, stress test, and report',
            description: 'Check disk health, gather system details, run CPU, disk, and memory tests, then export reports for handoff or records.',
            details: [
                'SMART disk health and thermal monitoring',
                'CPU, disk, and memory benchmarks with stress testing',
                'HTML, JSON, and CSV report export'
            ],
            tags: ['SMART', 'Benchmarks', 'Stress test', 'Reports'],
            shots: [
                ['Diagnostics panel', 'diag_benchmark_panel_diag.webp', 'Benchmark and Diagnostics workspace showing diagnostic tools', 1201, 1032],
                ['Benchmark panel', 'diag_benchmark_panel_benchmark.webp', 'Benchmark panel screenshot', 1204, 1031],
                ['Benchmark results', 'diag_benchmark_panel_benchmark_2.webp', 'Benchmark results screenshot', 1202, 1031]
            ]
        },
        {
            label: 'Files',
            eyebrow: 'File cleanup',
            title: 'Find, organize, and deduplicate data',
            description: 'Search across contents and metadata, sort messy folders by extension, and locate duplicate files with parallel hashing.',
            details: [
                'Organize files by extension',
                'Find duplicates with parallel hashing',
                'Regex, EXIF, metadata, archive, binary, and hex search modes'
            ],
            tags: ['Regex', 'Dedup', 'EXIF', 'Hex search'],
            shots: [
                ['Advanced search', 'file_management_advanced_search.webp', 'Advanced file search screenshot with search options and results', 1205, 834],
                ['Duplicate finder', 'file_management_duplicate_finder.webp', 'Duplicate finder screenshot', 1205, 832],
                ['File organizer', 'file_management_file_organizer.webp', 'File organizer screenshot', 1202, 832]
            ]
        },
        {
            label: 'Apps',
            eyebrow: 'App deployment',
            title: 'Install, bundle, and uninstall apps',
            description: 'Search Chocolatey packages, prepare offline bundles for new machines, and perform deeper uninstalls with leftover scanning.',
            details: [
                'Scan installed apps and match Chocolatey packages',
                'Bulk-install applications on new PCs',
                'Offline deployment, direct installer downloads, leftover scanning, and registry diff support'
            ],
            tags: ['Chocolatey', 'Offline deploy', 'Deep uninstall', 'Registry diff'],
            shots: [
                ['Offline deploy', 'application_management_panel_offline.webp', 'Application Management offline deployment screenshot', 1529, 1031],
                ['Online install', 'application_management_panel.webp', 'Application management online install screenshot', 1527, 1032],
                ['Advanced uninstall', 'application_management_panel_uninstaller.webp', 'Application uninstaller screenshot', 1039, 1030]
            ]
        },
        {
            label: 'Network',
            eyebrow: 'Network triage',
            title: 'Diagnose adapters, WiFi, and routes',
            description: 'Use a full diagnostic suite for routing, DNS, adapters, bandwidth, and WiFi support from one panel.',
            details: [
                'Ping, traceroute, MTR, DNS, port scan, and bandwidth checks',
                'Adapter inspection with backup and restore',
                'WiFi analysis and WiFi QR code management'
            ],
            tags: ['Ping', 'Traceroute', 'Port scan', 'WiFi QR'],
            shots: [
                ['Diagnostics', 'network_management_panel_diagnostics.webp', 'Network Management diagnostics panel screenshot', 1039, 1031],
                ['Adapters', 'network_management_panel_adapters.webp', 'Network adapter inspector screenshot', 1037, 1030],
                ['WiFi manager', 'network_management_panel_wifi.webp', 'WiFi profile manager screenshot', 1041, 1031]
            ]
        },
        {
            label: 'Email',
            eyebrow: 'Email forensics',
            title: 'Browse archives without Outlook',
            description: 'Inspect email archives, search mailbox contents, preview messages, browse attachments, and export data for analysis or migration.',
            details: [
                'Browse PST, OST, and MBOX archives without Outlook',
                'Search and export EML, CSV, VCF, and ICS data',
                'Contacts, calendar views, attachment browser, OST/PST converter, and IMAP upload'
            ],
            tags: ['PST', 'OST', 'MBOX', 'No Outlook', 'IMAP upload'],
            shots: [
                ['Email inspector', 'email_tools_panel_main.webp', 'Email Tools workspace showing folders, messages, and message preview', 1529, 1032],
                ['PST scanner', 'email_pst_scanner.webp', 'PST scanner screenshot', 643, 572]
            ]
        }
    ];

    const explorer = document.querySelector('[data-workspace-explorer]');
    const workspaceRefs = {
        tabs: document.getElementById('workspaceTabs'),
        eyebrow: document.getElementById('workspaceEyebrow'),
        title: document.getElementById('workspaceTitle'),
        description: document.getElementById('workspaceDescription'),
        details: document.getElementById('workspaceDetails'),
        tags: document.getElementById('workspaceTags'),
        imageLink: document.getElementById('workspaceImageLink'),
        image: document.getElementById('workspaceImage'),
        caption: document.getElementById('workspaceCaption'),
        shots: document.getElementById('workspaceShots')
    };

    function renderWorkspace(workspaceIndex, shotIndex = 0) {
        const workspace = screenshotWorkspaces[workspaceIndex];
        const shot = workspace.shots[shotIndex];
        const [shotTitle, file, alt, width, height] = shot;
        const imageUrl = `${screenshotPath}${file}`;

        explorer.style.setProperty('--workspace-accent', `var(--workspace-${workspaceIndex})`);
        workspaceRefs.eyebrow.textContent = workspace.eyebrow;
        workspaceRefs.title.textContent = workspace.title;
        workspaceRefs.description.textContent = workspace.description;
        workspaceRefs.imageLink.href = imageUrl;
        workspaceRefs.image.src = imageUrl;
        workspaceRefs.image.alt = alt;
        workspaceRefs.image.width = width;
        workspaceRefs.image.height = height;
        workspaceRefs.caption.textContent = shotTitle;

        workspaceRefs.details.replaceChildren(...workspace.details.map((detail) => {
            const item = document.createElement('li');
            item.textContent = detail;
            return item;
        }));

        workspaceRefs.tags.replaceChildren(...workspace.tags.map((tag) => {
            const item = document.createElement('span');
            item.textContent = tag;
            return item;
        }));

        workspaceRefs.shots.replaceChildren(...workspace.shots.map((item, index) => {
            const [title, itemFile, itemAlt] = item;
            const button = document.createElement('button');
            const thumb = document.createElement('img');
            const label = document.createElement('span');

            button.type = 'button';
            button.className = 'workspace-shot';
            button.setAttribute('aria-pressed', String(index === shotIndex));
            button.addEventListener('click', () => renderWorkspace(workspaceIndex, index));

            thumb.src = `${thumbnailPath}${itemFile}`;
            thumb.alt = itemAlt;
            thumb.width = 360;
            thumb.height = 203;
            thumb.loading = 'lazy';
            label.textContent = title;

            button.append(thumb, label);
            return button;
        }));

        workspaceRefs.tabs.querySelectorAll('button').forEach((button, index) => {
            button.classList.toggle('active', index === workspaceIndex);
            button.setAttribute('aria-selected', String(index === workspaceIndex));
        });
    }

    if (explorer) {
        workspaceRefs.tabs.replaceChildren(...screenshotWorkspaces.map((workspace, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.role = 'tab';
            button.textContent = workspace.label;
            button.addEventListener('click', () => renderWorkspace(index));
            return button;
        }));

        renderWorkspace(0);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
