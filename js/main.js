document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabList = document.querySelector('[role="tablist"]');

    if (!tabList) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', changeTabs);
    });

    let tabFocus = 0;
    tabList.addEventListener("keydown", e => {
        if (e.keyCode === 37 || e.keyCode === 39) {
            tabs[tabFocus].setAttribute("tabindex", -1);
            if (e.keyCode === 37) {
                tabFocus--;
                if (tabFocus < 0) tabFocus = tabs.length - 1;
            } else if (e.keyCode === 39) {
                tabFocus++;
                if (tabFocus >= tabs.length) tabFocus = 0;
            }
            tabs[tabFocus].setAttribute("tabindex", 0);
            tabs[tabFocus].click();
            tabs[tabFocus].focus();
        }
    });
});

function changeTabs(e) {
    const target = e.currentTarget;
    const controlsId = target.getAttribute("aria-controls");
    const tabs = document.querySelectorAll('.c-tab-btn');


    if (!controlsId) return;


    //タブの下線をリセット
    tabs.forEach(t => {
        t.classList.remove('c-tab_border');
    })
    // 選択されているタブのみ下線を太くする
    target.classList.add('c-tab_border');

    const parent = target.closest('[role="tablist"]');
    // section.l-news 内からパネルを探す
    const container = parent.closest('.l-news');

    // 1. すべてのタブの aria-selected を更新
    parent.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.setAttribute("aria-selected", tab === target ? "true" : "false");
    });

    // 2. すべてのパネルを隠す
    container.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        panel.classList.add('is-hidden');
    });

    // 3. 対象のパネルを表示
    const targetPanel = document.getElementById(controlsId);
    if (targetPanel) {
        targetPanel.classList.remove('is-hidden');
    }



}