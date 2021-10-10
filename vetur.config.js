// vetur.config.js
/** @type {import('vls').VeturConfig} */

module.exports = {
    settings: {
        "vetur.useWorkspaceDependencies": true,
        "vetur.experimental.templateInterpolationService": true
    },
    projects: [
        {
            root: './www', //root of subproject
            package: './package.json', // It is relative to root property.
            tsconfig: './tsconfig.json',  // It is relative to root property.
        }
    ]
}