#!/bin/sh
./header.cgi 

if [ -f /root/SmarTESTSmc ]; then
  RESTART="Restarting or stopping the SMC's will <font color="red">stop all tests</font> and remove pressure from any hydraulics attached to the controllers. Make sure they are not active when restarting."
  REBOOT="Rebooting the SMC's will <font color="red">stop all tests</font> and remove pressure from any hydraulics attached to the controller. Make sure the controller isn't active when rebooting."
else
  RESTART="Restarting or stopping the RTFE will <font color="red">stop all tests</font> and remove pressure from any hydraulics attached to the RTFE controllers. Make sure they are not active when restarting."
  REBOOT="Rebooting the controller will <font color="red">stop all tests</font> and remove pressure from any hydraulics attached to the controller. Make sure the controller isn't active when rebooting."
fi
SHUTDOWN="Shutting down the controller will <font color="red">stop all tests</font> and remove pressure from any hydraulics attached to the controller. Make sure the controller isn't active when rebooting."
MBR="Restoring the master boot record <font color="red">stop all tests</font> and remove pressure from any hydraulics attached to the RTFE controllers. Make sure they are not active when restarting. It will <font color="red">destroy all content</font> on the hard disk. Please make a backup before executing this command." 
LOCALTIME="Keep in mind that updating the local time doesn't influence the past diary items."
IPERF="Netwerk performance server (iperf)."
PUTTY="is a free implementation of Telnet and SSH for Windows and Unix platforms, along with an xterm terminal emulator."
PSCP="is a command-line secure file copy client."

echo "<h3 class=\"style1\">Actions</h3><br />"
echo '<ul>'
if [ -f /root/SmarTESTSmc ]; then
echo "  <li type="disc"> $RESTART    <br><br><td><span class='button'><a href='#' onclick=\"RestartSMC(20);\">   <span>(Re)start 20 Smc's</span></a></span>"
echo "                                           <span class='button'><a href='#' onclick=\"RestartSMC(32);\">   <span>(Re)start 32 Smc's</span></a></span>"
echo "                                           <span class='button'><a href='#' onclick=\"RestartSMC(40);\">   <span>(Re)start 40 Smc's</span></a></span>"
echo "                                           <span class='button'><a href='#' onclick=\"RestartSMC(64);\">   <span>(Re)start 64 Smc's</span></a></span>"
echo "                                           <span class='button'><a href='#' onclick=\"StopSMC();\">        <span>Stop</span>              </a></span></td><br><br><br>"
else
echo "  <li type="disc"> $RESTART    <br><br><td><span class='button'><a href='#' onclick=\"RestartRTFE();\">    <span>(Re)start</span>          </a></span>"
echo "                                           <span class='button'><a href='#' onclick=\"StopRTFE();\">       <span>Stop</span>               </a></span></td><br><br><br>"
fi
echo "  <li type="disc"> $REBOOT     <br><br><td><span class='button'><a href='#' onclick=\"RebootIPC();\">      <span>Reboot</span></a></span>  </a></span></td><br><br><br>"
echo "  <li type="disc"> $SHUTDOWN   <br><br><td><span class='button'><a href='#' onclick=\"Poweroff();\">       <span>Shutdown</span></a></span>  </a></span></td><br><br><br>"
echo "  <li type="disc"> $MBR        <br><br><td><span class='button'><a href='#' onclick=\"RestoreMBR();\">     <span>Restore MBR</span>        </a></span></td><br><br><br>"
echo "  <li type="disc"> $LOCALTIME  <br><br><td><span class='button'><a href='#' onclick=\"UpdateLocalTime();\"><span>Localtime</span>          </a></span></td><br><br><br>"
echo "  <li type="disc"> $IPERF      <br><br><td><span class='button'><a href='#' onclick=\"StartIperf();\">     <span>Start Iperf</span>        </a></span>"
echo "                                           <span class='button'><a href='#' onclick=\"StopIperf();\">      <span>Stop Iperf</span>         </a></span></td><br><br><br>"
echo '</ul>'

echo "<h3 class=\"style1\">Download Software</h3><br />"
echo '<ul>'
echo 	'<li type="disc"> <a href="./software/putty.exe" style="text-decoration:underline" ><span>PuTTY</span></a> is a free implementation of Telnet and SSH for Windows.'
echo 	'<li type="disc"> <a href="./software/pscp.exe" style="text-decoration:underline" ><span>PSCP</span></a> command-line secure file copy client.'
echo '</ul>'
