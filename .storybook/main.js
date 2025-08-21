/** @type { import('@storybook/react').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.css = {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    };
    return config;
  },
};

module.exports = config;
