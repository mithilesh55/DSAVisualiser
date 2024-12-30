// Function to toggle sidebar (on menu icon click)
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
  
    // Open or close the sidebar based on its current position
    if (sidebar.style.left === "0px") {
      closeSidebar();
    } else {
      sidebar.style.left = "0px";
      document.body.classList.add("sidebar-open");
    }
}
  
// Function to open sidebar when hovering over the left edge
function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = "0px";
    document.body.classList.add("sidebar-open");
}
  
// Function to close the sidebar
function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = "-250px";
    document.body.classList.remove("sidebar-open");
}

// Event listener to close sidebar when clicking outside
document.addEventListener("click", function(event) {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.getElementById("menuIcon");

    // Check if the click is outside the sidebar and menu icon
    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target) && document.body.classList.contains("sidebar-open")) {
        closeSidebar();
    }
});
