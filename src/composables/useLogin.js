export default function () {
    
    const signUp = () => {
        const container = document.getElementById("container");
        container.classList.add("right-panel-active");
    };
    const signIn = () => {
        const container = document.getElementById("container");
        container.classList.remove("right-panel-active");
    };

    return { signUp, signIn }
}