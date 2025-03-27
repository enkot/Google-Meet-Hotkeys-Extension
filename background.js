console.log("Google Meet extension has started.");

function executeScript(command) {
    const commands = {
        "toggle-screen-share": () => clickButton(['Розпочати презентацію зараз', 'Зупинити презентацію']),
        "toggle-people": () => clickButton('Люди'),
        "end-call": () => {
            console.log('Завершити дзвінок clicked')
            clickButton('Завершити дзвінок')
        },
    }

    if (!commands[command]) return;

    function clickButton(title) {
        const buttons = document.querySelectorAll('button');

        title = Array.isArray(title) ? title : [title];
    
        for (let btn of buttons) {
            if (title.includes(btn.ariaLabel)) {
                btn.click();
                break;
            }
            if (title.some((t) => btn.innerText.includes(t))) {
                btn.click();
                break;
            }
        }
    }

    commands[command]();
}

chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id, allFrames: true },
            function: executeScript,
            args: [command]
        });
    });
});
