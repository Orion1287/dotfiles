# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="robbyrussell"


plugins=(git asdf fzf-tab)

source $ZSH/oh-my-zsh.sh

source ~/.zsh_profile

#fzf
#[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
# bun completions
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun"

#shell comps
# Shell integrations
eval "$(fzf --zsh)"
eval "$(zoxide init --cmd cd zsh)"

# Bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

#aliases
alias ls='ls --color'
alias vim='nvim'
alias c='clear'

# pnpm
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
# pnpm end
# Turso
export PATH="$HOME/.turso:$PATH"

#STYLING
zstyle ':fzf-tab:complete:cd:*' fzf-preview 'ls --color $realpath'
zstyle ':fzf-tab:complete:__zoxide_z:*' fzf-preview 'ls --color $realpath'

