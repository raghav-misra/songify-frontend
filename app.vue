<template>
    <div id="root">
        <TransitionGroup name="page">
            <template v-if="isLoggedIn">
                <main>
                    <SideBar />
                    <NuxtPage />
                </main>
                <ControlBar />
            </template>


            <AuthFlow v-else />
        </TransitionGroup>
    </div>
</template>

<style>
html,
body {
    background: var(--dark);
}

#root {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
    display: flex;
    align-items: stretch;
    overflow: hidden;
}
</style>