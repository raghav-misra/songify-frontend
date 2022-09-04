<template>
    <aside>
        <section class="meta-bar">
            <b>BLASTED</b>
            <small>Sewerperson</small>
        </section>

        <section class="control-bar">
            <div class="progress-container">
                <small>0:05</small>
                <div class="progress-bar">
                    <div class="progress-filler"></div>
                </div>
                <small>3:28</small>
            </div>
        </section>
        
        <section class="queue-bar">
            <button class="icon" title="View Queue">
                <i class="fa-solid fa-list"></i>
            </button>

            <button class="icon" title="Toggle Volume">
                <i class="fa-solid fa-volume-high"></i>
            </button>
            
            <input type="range">
        </section>
    </aside>
</template>

<style scoped>
aside {
    background: var(--dark-accent);
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

section {
    flex: 1;
}

.control-bar {
    flex: 2;
    display: flex;
    align-items: stretch;
}

.meta-bar b {
    display: block;
}

.progress-container {
    display: flex;
    flex: 1;     
}

.progress-bar {
    background: var(--gray);
    height: 0.8rem;
    border-radius: 10px;
    margin: 0 0.5rem;
    width: 100%;  
    display: flex;
    align-items: stretch; 
    overflow: hidden;
}

.progress-filler {
    width: 50%;
    background: white;
    border-radius: 10px;
}

.progress-filler:hover {
    background: var(--alt);
}

.queue-bar {
    text-align: right;
}
</style>