function callServer(inUrl) {
    $.ajax({url: inUrl, success:function (result) {
            $("#contentFrame").html("");
            $("#contentFrame").html(result);
            $('#controllerInfoCmw').each(function () {
                    ShowControllerInfoCmw ('SystemInfo');
                });
            $('#controllerInfoMtc').each(function () {
                    ShowControllerInfoMtc ('SmarTESTInfo');
                });
            $('#controllerInfoAero').each(function () {
                    ShowControllerInfoAero ('SmarTESTInfo');
                });
            $("input:button, input:submit, .button, button").button();
            $("#filepicker").change (onFileSelected);
            if ($('#myTable tr').length) {
                $("#table").tablesorter();
            }
            $("#submit").click (uploadFile);
            var isIE = /*@cc_on!@*/false;
            if (!isIE) {
                $("#filepicker").addClass ("fakehidden");
                $("#filebutton").click (function () {
                    $("#filepicker").click();
                });
            }
            else {
                $("#filebutton").hide();
            }
        }
    });
}

function onFileSelected () {
    var filename = $("#filepicker").val();
    var extension = ".tar.gz"

    if (filename.length < extension.length ||
        filename.substring (filename.length - extension.length) != extension) {
        filename = "";
        $("#uploaderror").show().text ("Backups must be of type tar.gz");
    }
    else {
        //Internet explorer uses the full path as value of the file input
        var index = filename.lastIndexOf ("\\");
        if (index != -1) {
            filename = filename.substring (index+1);
        }
    }
    $("#uploadmessage").text (filename);

}

function callBackup(inUrl) {
    document.getElementById("infoBackup").style.display = "block";
    $.ajax ({url: inUrl, success:function (result){
            callServer ('./cgi-bin/listbackups.cgi');
            setPath ('Backup & Restore');
        }
    });
}

function uploadFile() {
    $("#upload_frame").load(function () {
        callServer('./cgi-bin/listbackups.cgi');
        setPath('Backup & Restore');
    });
}

function callTest() {
    $.ajax({url:"./cgi-bin/test.cgi", success:function(result){
            $("#infoBackup_text").html(result);
        }
    });
}

function SetLabel() {
    $.ajax ({
        url: "./cgi-bin/label.cgi",
        success: function(result) {
            $("#applicationName").title = result;
        }
    });
}

function setPath(path) {
    document.getElementById("NavigationPath").innerHTML = path;
}

function ReverseContentDisplay(d) {
    if(d.length < 1) { return; }
    if(document.getElementById(d).style.display == "none") { document.getElementById(d).style.display = "block"; }
    else { document.getElementById(d).style.display = "none"; }
}

function SetDateTime(url) {
    var date = $("#date").val();
    var time = $("#time").val();
    var ntp = $("#ntp").attr('checked') ? 'ntp' : 'local';
    var ntpServer = $("#ntp_server").val ();
    var url = url + escape(date) + "+" + escape(time) + "+" + escape(ntp) + "+" + escape(ntpServer);
    $("#contentFrame").html("");
    callServer(url);
}

function UpdateLocalTime() {
    var url = "./cgi-bin/cptlocaltime.cgi";
    callServer(url);
}

function RebootIPC() {
    var url = "./cgi-bin/cptreboot.cgi";
    var confirmed = window.confirm("Are you sure you want to reboot the IPC?");
    if (confirmed)
        {
        callServer(url);
        timedRefresh(30000);
        }
}

function timedRefresh(timeoutPeriod) {
    setTimeout("location.reload(true);",timeoutPeriod);
}

function ShutdownIPC() {
    var url = "./cgi-bin/cptshutdown.cgi";
    confirmed = window.confirm("Are you sure you want to shutdown the IPC?");
    if (confirmed)
    {
        callServer(url);
    }
}

function Poweroff() {
    var url = "./cgi-bin/poweroff.cgi";
    confirmed = window.confirm("Are you sure you want to poweroff the rtfe controller?");
    if (confirmed)
    {
        callServer(url);
    }
}

function RestartRTFE() {
    var url = "./cgi-bin/cptrestart.cgi";
    confirmed = window.confirm("Are you sure you want to restart the RTFE?");
    if (confirmed)
    {
        callServer(url);
    }
}

function StopRTFE() {
    var url = "./cgi-bin/cptstop.cgi";
    confirmed = window.confirm("Are you sure you want to stop the RTFE?");
    if (confirmed)
    {
        callServer(url);
    }
}

function RestartSMC(n) {
    var url = "./cgi-bin/cptrestartsmc.cgi?n="+n;
    confirmed = window.confirm("Are you sure you want to restart the SMC?");
    if (confirmed)
    {
        callServer(url);
    }
}

function StopSMC() {
    var url = "./cgi-bin/cptstopsmc.cgi";
    confirmed = window.confirm("Are you sure you want to stop the SMC?");
    if (confirmed)
    {
        callServer(url);
    }
}

function StartIperf() {
    var url = "./cgi-bin/cptstartiperf.cgi";
    callServer(url);
}

function StopIperf() {
    var url = "./cgi-bin/cptstopiperf.cgi";
    callServer(url);
}

function RestoreMBR() {
    var url = "./cgi-bin/cptrestorembr.cgi";
    confirmed = window.confirm("Are you sure you want to restore the MBR?");
    if (confirmed)
    {
        callServer(url);
    }
}

function SetIP(url) {
    var dhcp = $("#dhcp").attr('checked') ? 'dhcp' : 'fixed';
    var ipaddress = $("#ipaddress").val();
    var netmask = $("#netmask").val();
    var url = url + escape(dhcp) + "+" + escape(ipaddress) + "+" + escape(netmask);
    callServer(url);
}

function StartCodeMirror () {
    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            mode: "application/xml",
            lineNumbers: true,
            onCursorActivity: function() {
                editor.setLineClass(hlLine, null);
                hlLine = editor.setLineClass(editor.getCursor().line, "activeline");
            }
    });
    editor.setLineClass(0, "activeline");
}

function AddHeader (node, type, row) {
    attr = $(node).attr (type);
    if (attr != null) {
        row.append ('<th width="60px">' + type + '</th>');
    }
}

function AddData (node, type, row) {
    attr = $(node).attr (type);
    if (attr != null) {
        row.append ('<td width="60px">' + attr + '</td>');
    }
}

function AppendHardware (xml, type, parent) {
    var types = ['Firmware', 'CardNr', 'Inputs', 'Outputs', 'HexSwitch', 'HardwareID', 'Type', 'IPAddress', 'AmplifierType', 'DriveType', 'NodeAddress', 'SerialNumber', 'SoftwareVersion', 'Index'];

    nodes = $(xml).find("Web " + type);
    if (nodes.size () > 0) {
        var table = $("<table/>");
        table.addClass ("tablesorter");

        var header = $("<thead/>");
        var row = $('<tr/>');
        row.append ('<th> Name </th>');
        $(types).each ( function (i, element) {
                AddHeader (nodes, element, row);
            });

        header.append (row);
        table.append (header);

        var data = $('<tbody/>');
        nodes.each ( function (jj, element1) {
                var row = $("<tr>");
                row.append ('<td>' + type + ' ' + '</td>');
                $(types).each ( function (i, element) {
                        AddData (element1, element, row);
                    });
                data.append (row);
            });
        table.append (data);
        parent.append (table)
        table.tablesorter();
    }
}

function showHardwareInfo () {
    var node = $('#contentFrame');
    node.html ("");
    function processHwInfo (data) {
        var types = ['MTC', 'SCU', 'EC_EP2028', 'Rack Kollmorgen', 'Rack']
        $(types).each ( function (i, element) {
                AppendHardware (data, element, node);
            });
    }
    $.ajax({url: "./cgi-bin/hw_info.cgi",
            success: processHwInfo
            });
}

function ShowControllerInfoCmw (parent) {
    $.ajax({url: "./cgi-bin/downloadfile.cgi?/home/appl/rt_app/hw_info.xml",
            success: function (data) {
                    var hwXml = $($.parseXML (data));
                    var info = hwXml.find ('Web ' + parent);
                    $("#buildLabel").text(info.attr('Build'));
                    $("#buildDate").text(info.attr('BuildDate'));
                    $("#buildBranch").text(info.attr('BuildBranch'));
                    $("#ipAddress").text(info.attr('IP'));
                    $("#macAddress").text(info.attr('MAC'));
                    $("#controllerFrequency").text(info.attr('Frequency'));
                }
            });
}

function ShowControllerInfoMtc (parent) {
    $.ajax({url: "./cgi-bin/downloadfile.cgi?/home/appl/rt_app/hw_info.xml",
            success: function (data) {
                    var hwXml = $($.parseXML (data));
                    var info = hwXml.find ('Web ' + parent);
                    $("#buildLabel").text(info.attr('Build'));
                    $("#buildDate").text(info.attr('BuildDate'));
                    $("#buildBranch").text(info.attr('BuildBranch'));
                    $("#ipAddress").text(info.attr('IP'));
                    $("#macAddress").text(info.attr('MAC'));
                    $("#controllerFrequency").text(info.attr('Frequency'));
                    var scu = hwXml.find ('Web Rack[Name=Local] SCU');
                    $("#scuFirmwareVersion").text(scu.attr('Firmware'));
                    $("#scuHardwareId").text(scu.attr('HardwareID'));
                    var mtc = hwXml.find ('Web Rack[Name=Local] MTC');
                    $("#mtcVersion").text(mtc.attr('Firmware'));
                }
            });
}

function ShowControllerInfoAero (parent) {
    $.ajax({url: "./cgi-bin/downloadfile.cgi?/var/rt_app/hw_info.xml",
            success: function (data) {
                    var hwXml = $($.parseXML (data));
                    var info = hwXml.find ('Web ' + parent);
                    $("#buildLabel").text(info.attr('Build'));
                    $("#buildDate").text(info.attr('BuildDate'));
                    $("#buildBranch").text(info.attr('BuildBranch'));
                    $("#ipAddress").text(info.attr('IP'));
                    $("#macAddress").text(info.attr('MAC'));
                }
            });
}

