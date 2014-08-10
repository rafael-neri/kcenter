// Disable right click
if(typeof debug == 'undefined' || !debug){
    (function () {
      var blockContextMenu, myElement;

      blockContextMenu = function (evt) {
        evt.preventDefault();
      };

      myElement = document.querySelector('body');
      myElement.addEventListener('contextmenu', blockContextMenu);
    })();
}


// element to add content
var content = $("#main");

// get apps
var data = Pyjs.getApps();
var apps = $.parseJSON(data);

var result = "";
for(var category in apps){

    result += '<div class="ui raised segment category">' +
                '<div class="ui ribbon teal label title">' + category + '</div>' +
                '<br style="clear: both" />';

    for(var item = 0; item < apps[category].length; item++){
        var app = apps[category][item];

        result += '<div class="ui basic floated left segment app" data-content"' + app.comment + '">' +
                    '<a href="javascript:;" data-execute="' + app.execute + '">' +
                        '<div class="icon">' +
                            '<img src="' + app.icon + '" class="ui image" />' +
                        '</div>' +
                        '<div class="name">' + app.name + '</div>' +
                    '</a>' +
                    '<div class="ui active inverted dimmer"><div class="ui loader"></div></div>' +
                  '</div>';

    }

    result += '</div>';
}

content.append(result);


$(".app a").on("click", function(){

    // elements
    var elem = $(this);
    var execute = elem.data("execute");
    var body = $("body");

    body.addClass("load");
    elem.addClass("load");

    // execute
    Pyjs.cmd(execute);

    // hide loader
    setTimeout(function(){
        body.removeClass("load");
        elem.removeClass("load");
    }, 2000);

});