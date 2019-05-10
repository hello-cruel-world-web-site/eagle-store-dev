/*
 *    Eagle Script
 */
$("document").ready(function() {
    $("#sticky").on("click", function() {
        $("nav").toggleClass("nav-sticky");
        console.error("Alterado");
    });
});

