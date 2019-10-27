# kluginn

Simple modules for kintone.  

## Requisities not included in bundle.

kintone has 512KB file size limitation.  
** total file size was upgraded to 20MB.  
Just includes your requisities in your manifest.json  


## Preparing
Clone repo and run below command.

    npm install

## Build src

    npm run build

## Usage

Include dist/kluginn.js with git-submodule.

    git submodule add REPOURL ./YOUR/PATH
    # If you want to update whole submodules.
    git submodule update --init --remote --recursive


