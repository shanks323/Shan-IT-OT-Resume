import React, { useState } from 'react';
import { X, Network, Cpu, Terminal, CheckCircle2, Server, ArrowRight, Play, RefreshCw } from 'lucide-react';
import { ResumeData } from '../data/resumeData';

interface Props {
  data: ResumeData;
  isOpen: boolean;
  onClose: () => void;
}

export const LabTopologyModal: React.FC<Props> = ({ data, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'schematic' | 'diagnostics'>('topology');
  const [pingRunning, setPingRunning] = useState(false);
  const [pingResults, setPingResults] = useState<string[]>([
    'Pinging 192.168.0.2 (Siemens S7-1200 PLC) with 32 bytes of data:',
    'Reply from 192.168.0.2: bytes=32 time=1.2ms TTL=64',
    'Reply from 192.168.0.2: bytes=32 time=0.9ms TTL=64',
    'Reply from 192.168.0.2: bytes=32 time=1.1ms TTL=64',
    'Ping statistics for 192.168.0.2: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)',
  ]);

  if (!isOpen) return null;

  const runSimulatedPing = () => {
    setPingRunning(true);
    setPingResults(['Initiating ICMP Echo Request to 192.168.0.2 via Ethernet interface...']);
    setTimeout(() => {
      setPingResults((prev) => [
        ...prev,
        'Connecting to Siemens PROFINET / Industrial Ethernet port 102...',
        'Reply from 192.168.0.2: bytes=32 time=0.8ms TTL=64 [Link: UP]',
        'Reply from 192.168.0.2: bytes=32 time=0.7ms TTL=64 [MAC: 00:1B:1B:34:A2:12]',
        'Status: 0% Packet Loss. TIA Portal communication channel ONLINE.',
      ]);
      setPingRunning(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Home IT/OT Lab — Technical Architecture & Diagnostics
              </h2>
              <p className="text-xs text-slate-400">
                Interactive verification of Shanker Dayallan's PC, LAN & Siemens TIA Portal setup
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('topology')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'topology'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Network & Hardware Topology</span>
          </button>
          <button
            onClick={() => setActiveTab('schematic')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'schematic'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Lab Workstation View</span>
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'diagnostics'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Diagnostic Console & Workflow</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 text-sm">
          {activeTab === 'topology' && (
            <div className="space-y-6">
              {/* Interactive Topology Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                {/* Node 1: Workstation */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">
                        Workstation Node
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <div className="font-bold text-white text-sm mb-1">Windows Support PC</div>
                    <p className="text-xs text-slate-400">
                      Primary engineering and administrative terminal with Siemens TIA Portal v17/v18.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700/80 font-mono text-[11px] text-slate-300 space-y-1">
                    <div>IP: 192.168.0.10</div>
                    <div>Subnet: 255.255.255.0</div>
                    <div>NIC: Intel I219-V GbE</div>
                  </div>
                </div>

                {/* Node 2: Switch */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                        Switching Fabric
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </div>
                    <div className="font-bold text-white text-sm mb-1">Ethernet Switch / LAN</div>
                    <p className="text-xs text-slate-400">
                      Standard unmanaged switch with full-duplex Cat6 cabling connecting lab endpoints.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700/80 font-mono text-[11px] text-slate-300 space-y-1">
                    <div>Port 1: PC Uplink</div>
                    <div>Port 2: Siemens PLC S7</div>
                    <div>Protocol: PROFINET / TCP</div>
                  </div>
                </div>

                {/* Node 3: Siemens PLC */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                        Industrial OT Node
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </div>
                    <div className="font-bold text-white text-sm mb-1">Siemens S7-1200 PLC</div>
                    <p className="text-xs text-slate-400">
                      Industrial controller running ladder logic (LAD), diagnostic buffer, and digital I/O simulation.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700/80 font-mono text-[11px] text-slate-300 space-y-1">
                    <div>IP: 192.168.0.2</div>
                    <div>Firmware: Sitrain Spec</div>
                    <div>Port: ISO-on-TCP (102)</div>
                  </div>
                </div>
              </div>

              {/* Lab Accomplishments List */}
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Practical Skills Proven In This Lab
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">▸</span>
                    <span><strong>Static Subnet Planning:</strong> Configured isolated testing range (192.168.0.0/24) to ensure deterministic communication.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">▸</span>
                    <span><strong>Hardware Fault Simulation:</strong> Created cable disconnects and IP conflicts to master root-cause resolution.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">▸</span>
                    <span><strong>Siemens TIA Portal Ladder Logic:</strong> Created start/stop circuits, timers, and diagnostic monitoring blocks.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">▸</span>
                    <span><strong>Technical Documentation:</strong> Documented cable runs, IP assignments, and recovery steps for repeatable handover.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schematic' && (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                <img
                  src={data.projectImageUrl}
                  alt="Home IT/OT Lab Schematic and Hardware Layout"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[380px] object-cover"
                />
              </div>
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white text-sm">Visual Documentation Overview</div>
                <p>
                  This illustration represents the physical setup at Shanker's home workstation combining a dedicated Windows diagnostics terminal, Cat6 patch paneling, and the Siemens S7 modular controller. The setup allows simulating the exact handoff between IT networks and Operational Technology (OT) shop-floor devices.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div className="space-y-4">
              {/* Terminal View */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-500 text-[11px]">
                  <span>DIAGNOSTIC TERMINAL — IT/OT LAB INTERFACE</span>
                  <button
                    onClick={runSimulatedPing}
                    disabled={pingRunning}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-600/30 text-blue-300 border border-blue-500/40 hover:bg-blue-600/50 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${pingRunning ? 'animate-spin' : ''}`} />
                    <span>Run ICMP Test</span>
                  </button>
                </div>

                <div className="space-y-1">
                  {pingResults.map((line, idx) => (
                    <div key={idx} className={line.includes('Reply') ? 'text-emerald-400' : line.includes('Status') ? 'text-blue-300 font-bold' : 'text-slate-300'}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Operating Procedure */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-white text-sm">Standard Fault-Diagnosis Workflow</div>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li><strong>Layer 1 Check:</strong> Verify physical RJ45 link lights on both the PC NIC and the Siemens S7-1200 controller.</li>
                  <li><strong>Layer 3 Check:</strong> Ping the target controller static IP (`192.168.0.2`) to verify route validity.</li>
                  <li><strong>Layer 7 Application Check:</strong> Launch Siemens TIA Portal, query the Online & Diagnostics buffer for error code events.</li>
                  <li><strong>Log & Document:</strong> Update asset register and incident notes with timestamp, root cause, and remediation.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Project by Shanker Dayallan (IT Support / IT-OT Technician)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
