module.exports = {
    apps: [
        {
            name: 'server-backup',
            script: './build/app.js',
            watch: false,
            node_args: '--max_old_space_size=1500',
            instances: 1,
            exec_mode: 'fork',
            autorestart: true
        },
    ],
};


