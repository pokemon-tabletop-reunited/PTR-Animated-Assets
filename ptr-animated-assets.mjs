Hooks.on("init", () => {
    game.settings.register("ptr-animated-assets", "initialized", {
        name: "Initialized",
        hint: "Make sure that image settings are only changed once",
        scope: "world",
        config: false,
        type: Boolean,
        default: false
    });
});

Hooks.on("ready", async () => {
    if(!game.user.isGM) return;
    if(game.system.id !== "ptu") return;
    if(game.settings.get("ptr-animated-assets", "initialized")) return;
    
    const imageDirectory = game.settings.get("ptu", "generation.defaultImageDirectory");
    // If default folder is set change it to new folder
    if(!imageDirectory || imageDirectory?.includes("systems/ptu/static/images/sprites")) {
        await game.settings.set("ptu", "generation.defaultImageDirectory", "modules/ptr-animated-assets/sprites");
    }
    // if custom folder is set, warn user that they need to change it manually
    else {
        ui.notifications.warn("PTR Animated Assets: Please change your default image directory to 'modules/ptr-animated-assets/sprites' in the PTU System Settings");
        // Send message only to GMs letting them know to change the default image directory
        ChatMessage.create({
            content: "<h1>PTR Animated Assets</h1><p>Please change your default image directory in the PTR System Settings</p><blockquote>Path:<br><code>modules/ptr-animated-assets/sprites</code></blockquote>",
            whisper: ChatMessage.getWhisperRecipients("GM")
        });
    }
    
    const actorImageFileExtensions = game.settings.get("ptu", "generation.defaultImageExtension");
    // If default file extension is set change it to new file extension
    if(!actorImageFileExtensions || actorImageFileExtensions === ".webp" || actorImageFileExtensions === "webp") {
        await game.settings.set("ptu", "generation.defaultImageExtension", ".png");
    }
    // if custom file extension is set, warn user that they need to change it manually
    else {
        ui.notifications.warn("PTR Animated Assets: Please change your default image extension to '.png' in the PTU System Settings");
        // Send message only to GMs letting them know to change the default image extension
        ChatMessage.create({
            content: "<h1>PTR Animated Assets</h1><p>Please change your default actor image extension in the PTR System Settings</p><blockquote>Extension:<br><code>.png</code></blockquote>",
            whisper: ChatMessage.getWhisperRecipients("GM")
        });
    }

    const tokenImageFileExtensions = game.settings.get("ptu", "generation.defaultTokenImageExtension");
    // If default file extension is set change it to new file extension
    if(!tokenImageFileExtensions || tokenImageFileExtensions === ".webp" || tokenImageFileExtensions === "webp") {
        await game.settings.set("ptu", "generation.defaultTokenImageExtension", ".webm");
    }
    // if custom file extension is set, warn user that they need to change it manually
    else {
        ui.notifications.warn("PTR Animated Assets: Please change your default token image extension to '.webm' in the PTU System Settings");
        // Send message only to GMs letting them know to change the default image extension
        ChatMessage.create({
            content: "<h1>PTR Animated Assets</h1><p>Please change your default token image extension in the PTR System Settings</p><blockquote>Extension:<br><code>.webm</code></blockquote>",
            whisper: ChatMessage.getWhisperRecipients("GM")
        });
    }

    await game.settings.set("ptr-animated-assets", "initialized", true);
    await ui.notifications.info("PTR Animated Assets: Settings have been updated.");
});