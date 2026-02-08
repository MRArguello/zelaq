const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..', '..');
const appNodeModules = path.resolve(__dirname, 'node_modules');
const uiPackageSrc = path.resolve(workspaceRoot, 'packages', 'ui', 'src');

module.exports = {
    projectRoot: __dirname,
    watchFolders: [
        path.resolve(workspaceRoot, 'packages'),
        path.resolve(workspaceRoot)
    ],
    resolver: {
        extraNodeModules: {
            // Map workspace packages to source for fast iteration
            '@zelaq/ui': uiPackageSrc,
            '@zelaq/ui/provider': path.resolve(uiPackageSrc, 'provider'),
            // Ensure all workspace packages use the app's React and styled-components
            // to avoid multiple instances causing hook errors
            'react': path.resolve(appNodeModules, 'react'),
            'react-native': path.resolve(appNodeModules, 'react-native'),
            'styled-components': path.resolve(appNodeModules, 'styled-components')
        },
        sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json']
    }
};
