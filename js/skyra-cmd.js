(function($){
    $.fn.skyracmd = function(context){

        var all = [];
        for(directoryName in context.files) { 
            var directory = context.files[directoryName];
            for (i=0;i<directory.length;i++) {
                if ($.grep(all, function(n) { return n.id == directory[i].id; }).length == 0) {
                    all.push(directory[i]);
                }
            }
        }
        context.files['all'] = all; 

        var console1 = $('<div class="console1">');
        $('body').append(console1);
        var controller1 = console1.console({
            promptLabel: '-skyra$ ',
            commandValidate:function(line){
                if (line == "") return false;
                else return true;
            },
            commandHandle:function(line, report){
                return parse(line.split(" "), report);
            },
            completeHandle:function(line) {
                var results = []
                args = line.split(" ");
                if (args.length == 1) {
                    for (command in commands) {
                        if (command.indexOf(args[0]) == 0) {
                            results.push(command);
                        }
                    }
                } else if(args.length == 2) {
                    if (context.currentDir == "") {
                        for (i=0; i<context.directories.length; i++) {
                            var file = context.directories[i];
                            if (file.indexOf(args[1]) == 0) {
                                results.push(file);
                            }
                        }
                    } else {
                        directory = context.files[context.currentDir];
                        for (i=0; i<directory.length; i++) {
                            var file = directory[i].id;
                            if (file.indexOf(args[1]) == 0) {
                                results.push(file);
                            }
                        }
                    }
                }

                if (results.length == 1) {
                    results[0] = results[0].substr(args[args.length-1].length) + " ";
                }

                return results;
            },
            cols:4,
            autofocus:true,
            animateScroll:true,
            promptHistory:true,
            welcomeMessage:'Welcome to Skyra'
        });

        var parse = function(args, report) {
            var command = commands[args[0]];
            var errorMsg = "command not found";
            if (command) {
                var result = command(args, report);
                if (result.error) {
                    errorMsg = result.error;
                } else {
                    return result;
                }
            }

            return [{msg: "-skyra: " + args[0] + ": " + errorMsg,
                            className:"jquery-console-message-error"}];
         }

        var commands = {
            cd: function(args) {
                arg = args[1];
                if (context.directories.indexOf(arg) >= 0) {
                    context.currentDir = arg;
                    return "";
                } else if (arg == "..") {
                    context.currentDir = "";
                    return "";
                } else {
                    return {error: args[1] + ": No such tag or category"}
                }
            },
            pwd: function(args) {
                return "/" + context.currentDir;
            },
            ls: function(args) {
                results = []
                if (context.currentDir == "") {
                    for (i=0; i<context.directories.length; i++) {
                        results.push({msg: context.directories[i]});
                    }
                } else {
                    directory = context.files[context.currentDir];
                    for (i=0; i<directory.length; i++) {
                        results.push({msg: directory[i].id});
                    }
                }
                return results;
            },
            cat: function(args, report) {
                if (context.currentDir != "") {
                    directory = context.files[context.currentDir];
                    for (i=0; i<directory.length; i++) {
                        if (directory[i].id == args[1]) {
                            var reportResult = report;
                            $.ajax({
                                type    : 'GET',
                                url     : 'https://raw.githubusercontent.com/skyra/skyra.github.com/master/'+directory[i].path,
                                complete: function(data) {
                                    if (data.status == 200) {
                                        reportResult(data.responseText);
                                    } else {
                                        reportResult([{msg: "-skyra: cat: " + "there was an error loading page",
                                            className:"jquery-console-message-error"}]);
                                    }
                                }
                            });
                            return;
                        }
                    }
                }
                return {error: args[1] + ": No such post"}
            },
            normal: function() {
                var win = window.open('/blog.html', '_blank');
                win.focus();
                return "opened new window";
            },
            help: function() {
                return "commands you can run: cd, pwd, ls, cat, normal";
            }
        }
  };
})(jQuery);