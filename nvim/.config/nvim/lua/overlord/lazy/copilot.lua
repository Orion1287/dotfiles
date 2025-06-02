
-- ~/.config/nvim/lua/plugins/copilot.lua
return {
  "zbirenbaum/copilot.lua",
  cmd = "Copilot", -- lazy-load on Copilot command
  event = "InsertEnter", -- or "VeryLazy"
  config = function()
    require("copilot").setup({
      suggestion = { enabled = true },
      panel = { enabled = false },
    })
  end,
}
