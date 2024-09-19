"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unplugin_swc_1 = require("unplugin-swc");
const config_1 = require("vitest/config");
const vite_tsconfig_paths_1 = require("vite-tsconfig-paths");
exports.default = (0, config_1.defineConfig)({
    test: {
        include: ['./src/**/*.e2e-spec.ts'],
        globals: true,
        root: './',
        setupFiles: ['./test/setup.e2e.ts'],
    },
    plugins: [
        (0, vite_tsconfig_paths_1.default)(),
        unplugin_swc_1.default.vite({
            module: { type: 'es6' },
        }),
    ],
});
//# sourceMappingURL=vitest.config.e2e.js.map