import React, { useState } from 'react';
import { Edit3, Download, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ResumeTemplates.css';

// Inline SVG mini-previews for each template
const TemplateSVG = ({ id }) => {
  const svgs = {
    1: (
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="200" height="260" fill="white"/>
        {/* Header */}
        <rect x="40" y="18" width="120" height="10" rx="2" fill="#1e40af"/>
        <rect x="55" y="32" width="90" height="6" rx="2" fill="#93c5fd"/>
        <rect x="30" y="42" width="140" height="1" fill="#e2e8f0"/>
        <rect x="60" y="46" width="30" height="4" rx="1" fill="#94a3b8"/>
        <rect x="95" y="46" width="30" height="4" rx="1" fill="#94a3b8"/>
        <rect x="130" y="46" width="30" height="4" rx="1" fill="#94a3b8"/>
        {/* Section */}
        <rect x="20" y="58" width="60" height="5" rx="1" fill="#374151"/>
        <rect x="20" y="65" width="160" height="1" fill="#e2e8f0"/>
        <rect x="20" y="70" width="160" height="3" rx="1" fill="#d1d5db"/>
        <rect x="20" y="76" width="130" height="3" rx="1" fill="#d1d5db"/>
        {/* Experience */}
        <rect x="20" y="86" width="70" height="5" rx="1" fill="#374151"/>
        <rect x="20" y="93" width="160" height="1" fill="#e2e8f0"/>
        <rect x="20" y="98" width="100" height="4" rx="1" fill="#1e40af"/>
        <rect x="130" y="98" width="50" height="3" rx="1" fill="#94a3b8"/>
        <rect x="20" y="105" width="80" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="111" width="160" height="3" rx="1" fill="#d1d5db"/>
        <rect x="20" y="117" width="140" height="3" rx="1" fill="#d1d5db"/>
        {/* Education */}
        <rect x="20" y="128" width="60" height="5" rx="1" fill="#374151"/>
        <rect x="20" y="135" width="160" height="1" fill="#e2e8f0"/>
        <rect x="20" y="140" width="110" height="4" rx="1" fill="#1e40af"/>
        <rect x="140" y="140" width="40" height="3" rx="1" fill="#94a3b8"/>
        <rect x="20" y="147" width="90" height="3" rx="1" fill="#6b7280"/>
        {/* Skills */}
        <rect x="20" y="158" width="40" height="5" rx="1" fill="#374151"/>
        <rect x="20" y="165" width="160" height="1" fill="#e2e8f0"/>
        <rect x="20" y="170" width="40" height="14" rx="7" fill="#dbeafe"/>
        <rect x="65" y="170" width="40" height="14" rx="7" fill="#dbeafe"/>
        <rect x="110" y="170" width="40" height="14" rx="7" fill="#dbeafe"/>
        <rect x="155" y="170" width="25" height="14" rx="7" fill="#dbeafe"/>
      </svg>
    ),
    2: (
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="200" height="260" fill="white"/>
        <rect x="20" y="16" width="100" height="11" rx="2" fill="#111827"/>
        <rect x="20" y="30" width="70" height="5" rx="1" fill="#374151"/>
        <rect x="20" y="38" width="160" height="1" fill="#111827"/>
        <rect x="20" y="43" width="50" height="3" rx="1" fill="#6b7280"/>
        <rect x="75" y="43" width="50" height="3" rx="1" fill="#6b7280"/>
        <rect x="130" y="43" width="50" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="53" width="55" height="4" rx="1" fill="#111827"/>
        <rect x="20" y="59" width="160" height="1" fill="#111827"/>
        <rect x="20" y="63" width="160" height="3" rx="1" fill="#d1d5db"/>
        <rect x="20" y="69" width="130" height="3" rx="1" fill="#d1d5db"/>
        <rect x="20" y="79" width="65" height="4" rx="1" fill="#111827"/>
        <rect x="20" y="85" width="160" height="1" fill="#111827"/>
        <rect x="20" y="89" width="100" height="4" rx="1" fill="#374151"/>
        <rect x="130" y="89" width="50" height="3" rx="1" fill="#9ca3af"/>
        <rect x="20" y="96" width="80" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="102" width="160" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="20" y="108" width="140" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="20" y="118" width="55" height="4" rx="1" fill="#111827"/>
        <rect x="20" y="124" width="160" height="1" fill="#111827"/>
        <rect x="20" y="128" width="110" height="4" rx="1" fill="#374151"/>
        <rect x="140" y="128" width="40" height="3" rx="1" fill="#9ca3af"/>
        <rect x="20" y="135" width="90" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="145" width="40" height="4" rx="1" fill="#111827"/>
        <rect x="20" y="151" width="160" height="1" fill="#111827"/>
        <rect x="20" y="155" width="160" height="3" rx="1" fill="#e5e7eb"/>
      </svg>
    ),
    3: (
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="200" height="260" fill="white"/>
        {/* Navy header */}
        <rect width="200" height="65" fill="#1e3a8a"/>
        <rect x="40" y="14" width="120" height="11" rx="2" fill="white"/>
        <rect x="55" y="28" width="90" height="6" rx="2" fill="#bfdbfe"/>
        <rect x="30" y="38" width="50" height="4" rx="1" fill="#93c5fd"/>
        <rect x="85" y="38" width="50" height="4" rx="1" fill="#93c5fd"/>
        <rect x="140" y="38" width="40" height="4" rx="1" fill="#93c5fd"/>
        <rect x="30" y="48" width="50" height="4" rx="1" fill="#93c5fd"/>
        {/* Body */}
        <rect x="20" y="74" width="60" height="5" rx="1" fill="#1e3a8a"/>
        <rect x="20" y="81" width="160" height="2" fill="#1e3a8a"/>
        <rect x="20" y="86" width="160" height="3" rx="1" fill="#d1d5db"/>
        <rect x="20" y="92" width="130" height="3" rx="1" fill="#d1d5db"/>
        <rect x="20" y="102" width="70" height="5" rx="1" fill="#1e3a8a"/>
        <rect x="20" y="109" width="160" height="2" fill="#1e3a8a"/>
        <rect x="20" y="114" width="100" height="4" rx="1" fill="#374151"/>
        <rect x="130" y="114" width="50" height="3" rx="1" fill="#9ca3af"/>
        <rect x="20" y="121" width="80" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="127" width="160" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="20" y="133" width="140" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="20" y="143" width="60" height="5" rx="1" fill="#1e3a8a"/>
        <rect x="20" y="150" width="160" height="2" fill="#1e3a8a"/>
        <rect x="20" y="155" width="110" height="4" rx="1" fill="#374151"/>
        <rect x="140" y="155" width="40" height="3" rx="1" fill="#9ca3af"/>
        <rect x="20" y="162" width="90" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="172" width="40" height="5" rx="1" fill="#1e3a8a"/>
        <rect x="20" y="179" width="160" height="2" fill="#1e3a8a"/>
        <rect x="20" y="184" width="40" height="12" rx="6" fill="#dbeafe"/>
        <rect x="65" y="184" width="40" height="12" rx="6" fill="#dbeafe"/>
        <rect x="110" y="184" width="40" height="12" rx="6" fill="#dbeafe"/>
      </svg>
    ),
    4: (
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="200" height="260" fill="white"/>
        {/* Left sidebar */}
        <rect width="65" height="260" fill="#0f172a"/>
        <circle cx="32" cy="35" r="18" fill="#1e40af"/>
        <rect x="10" y="57" width="45" height="6" rx="2" fill="white"/>
        <rect x="10" y="66" width="45" height="4" rx="1" fill="#94a3b8"/>
        <rect x="10" y="80" width="45" height="4" rx="1" fill="#64748b"/>
        <rect x="10" y="74" width="45" height="4" rx="1" fill="#64748b"/>
        <rect x="10" y="88" width="45" height="4" rx="1" fill="#64748b"/>
        <rect x="10" y="100" width="30" height="4" rx="1" fill="#94a3b8"/>
        <rect x="10" y="107" width="45" height="3" rx="1" fill="#64748b"/>
        <rect x="10" y="113" width="40" height="3" rx="1" fill="#64748b"/>
        <rect x="10" y="119" width="45" height="3" rx="1" fill="#64748b"/>
        <rect x="10" y="130" width="35" height="4" rx="1" fill="#94a3b8"/>
        <rect x="10" y="137" width="20" height="8" rx="4" fill="#1e40af"/>
        <rect x="33" y="137" width="22" height="8" rx="4" fill="#1e40af"/>
        <rect x="10" y="148" width="25" height="8" rx="4" fill="#1e40af"/>
        <rect x="38" y="148" width="17" height="8" rx="4" fill="#334155"/>
        {/* Main area */}
        <rect x="75" y="18" width="110" height="9" rx="2" fill="#0f172a"/>
        <rect x="75" y="30" width="80" height="5" rx="1" fill="#475569"/>
        <rect x="75" y="44" width="55" height="4" rx="1" fill="#0f172a"/>
        <rect x="75" y="50" width="115" height="1" fill="#e2e8f0"/>
        <rect x="75" y="55" width="115" height="3" rx="1" fill="#d1d5db"/>
        <rect x="75" y="61" width="95" height="3" rx="1" fill="#d1d5db"/>
        <rect x="75" y="70" width="65" height="4" rx="1" fill="#0f172a"/>
        <rect x="75" y="76" width="115" height="1" fill="#e2e8f0"/>
        <rect x="75" y="80" width="95" height="4" rx="1" fill="#374151"/>
        <rect x="75" y="87" width="75" height="3" rx="1" fill="#6b7280"/>
        <rect x="75" y="93" width="115" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="75" y="99" width="95" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="75" y="109" width="65" height="4" rx="1" fill="#0f172a"/>
        <rect x="75" y="115" width="115" height="1" fill="#e2e8f0"/>
        <rect x="75" y="119" width="100" height="4" rx="1" fill="#374151"/>
        <rect x="75" y="126" width="80" height="3" rx="1" fill="#6b7280"/>
      </svg>
    ),
    5: (
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="200" height="260" fill="white"/>
        <rect x="20" y="16" width="160" height="12" rx="2" fill="#111827"/>
        <rect x="50" y="31" width="100" height="5" rx="1" fill="#6b7280"/>
        <rect x="35" y="40" width="50" height="3" rx="1" fill="#9ca3af"/>
        <rect x="90" y="40" width="20" height="3" rx="1" fill="#9ca3af"/>
        <rect x="115" y="40" width="50" height="3" rx="1" fill="#9ca3af"/>
        {/* Centered section titles */}
        <rect x="70" y="52" width="60" height="5" rx="1" fill="#111827"/>
        <rect x="85" y="59" width="30" height="2" fill="#374151"/>
        <rect x="20" y="64" width="160" height="3" rx="1" fill="#d1d5db"/>
        <rect x="30" y="70" width="140" height="3" rx="1" fill="#d1d5db"/>
        <rect x="65" y="80" width="70" height="5" rx="1" fill="#111827"/>
        <rect x="85" y="87" width="30" height="2" fill="#374151"/>
        <rect x="20" y="93" width="110" height="4" rx="1" fill="#374151"/>
        <rect x="140" y="93" width="40" height="3" rx="1" fill="#9ca3af"/>
        <rect x="20" y="100" width="80" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="106" width="160" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="20" y="112" width="120" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="20" y="122" width="110" height="4" rx="1" fill="#374151"/>
        <rect x="140" y="122" width="40" height="3" rx="1" fill="#9ca3af"/>
        <rect x="20" y="129" width="80" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="135" width="160" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="65" y="145" width="70" height="5" rx="1" fill="#111827"/>
        <rect x="85" y="152" width="30" height="2" fill="#374151"/>
        <rect x="20" y="158" width="110" height="4" rx="1" fill="#374151"/>
        <rect x="140" y="158" width="40" height="3" rx="1" fill="#9ca3af"/>
        <rect x="20" y="165" width="90" height="3" rx="1" fill="#6b7280"/>
        <rect x="65" y="175" width="70" height="5" rx="1" fill="#111827"/>
        <rect x="85" y="182" width="30" height="2" fill="#374151"/>
        <rect x="20" y="188" width="40" height="12" rx="6" fill="#f3f4f6"/>
        <rect x="65" y="188" width="40" height="12" rx="6" fill="#f3f4f6"/>
        <rect x="110" y="188" width="40" height="12" rx="6" fill="#f3f4f6"/>
        <rect x="155" y="188" width="25" height="12" rx="6" fill="#f3f4f6"/>
      </svg>
    ),
    6: (
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="200" height="260" fill="white"/>
        {/* Green sidebar */}
        <rect width="68" height="260" fill="#064e3b"/>
        <circle cx="34" cy="35" r="20" fill="#065f46"/>
        <rect x="8" y="60" width="52" height="7" rx="2" fill="white"/>
        <rect x="8" y="71" width="52" height="4" rx="1" fill="#6ee7b7"/>
        <rect x="8" y="83" width="30" height="4" rx="1" fill="#6ee7b7"/>
        <rect x="8" y="90" width="52" height="3" rx="1" fill="#a7f3d0"/>
        <rect x="8" y="96" width="52" height="3" rx="1" fill="#a7f3d0"/>
        <rect x="8" y="102" width="40" height="3" rx="1" fill="#a7f3d0"/>
        <rect x="8" y="112" width="35" height="4" rx="1" fill="#6ee7b7"/>
        <rect x="8" y="119" width="18" height="9" rx="4" fill="#059669"/>
        <rect x="29" y="119" width="24" height="9" rx="4" fill="#059669"/>
        <rect x="8" y="131" width="24" height="9" rx="4" fill="#059669"/>
        <rect x="8" y="143" width="35" height="4" rx="1" fill="#6ee7b7"/>
        <rect x="8" y="150" width="52" height="3" rx="1" fill="#a7f3d0"/>
        <rect x="8" y="156" width="40" height="3" rx="1" fill="#a7f3d0"/>
        {/* Main */}
        <rect x="78" y="18" width="108" height="9" rx="2" fill="#064e3b"/>
        <rect x="78" y="30" width="80" height="5" rx="1" fill="#059669"/>
        <rect x="78" y="44" width="55" height="4" rx="1" fill="#064e3b"/>
        <rect x="78" y="50" width="108" height="1" fill="#d1fae5"/>
        <rect x="78" y="55" width="108" height="3" rx="1" fill="#d1d5db"/>
        <rect x="78" y="61" width="88" height="3" rx="1" fill="#d1d5db"/>
        <rect x="78" y="70" width="65" height="4" rx="1" fill="#064e3b"/>
        <rect x="78" y="76" width="108" height="1" fill="#d1fae5"/>
        <rect x="78" y="80" width="90" height="4" rx="1" fill="#374151"/>
        <rect x="78" y="87" width="70" height="3" rx="1" fill="#6b7280"/>
        <rect x="78" y="93" width="108" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="78" y="99" width="88" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="78" y="109" width="60" height="4" rx="1" fill="#064e3b"/>
        <rect x="78" y="115" width="108" height="1" fill="#d1fae5"/>
        <rect x="78" y="119" width="95" height="4" rx="1" fill="#374151"/>
        <rect x="78" y="126" width="75" height="3" rx="1" fill="#6b7280"/>
      </svg>
    ),
    7: (
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="200" height="260" fill="white"/>
        {/* Red accent bar left */}
        <rect width="6" height="260" fill="#dc2626"/>
        <rect x="16" y="16" width="110" height="11" rx="2" fill="#111827"/>
        <rect x="16" y="30" width="80" height="5" rx="1" fill="#dc2626"/>
        <rect x="16" y="40" width="45" height="3" rx="1" fill="#6b7280"/>
        <rect x="65" y="40" width="45" height="3" rx="1" fill="#6b7280"/>
        <rect x="114" y="40" width="45" height="3" rx="1" fill="#6b7280"/>
        <rect x="16" y="52" width="160" height="1" fill="#fee2e2"/>
        <rect x="16" y="58" width="60" height="5" rx="1" fill="#dc2626"/>
        <rect x="16" y="65" width="160" height="3" rx="1" fill="#d1d5db"/>
        <rect x="16" y="71" width="130" height="3" rx="1" fill="#d1d5db"/>
        <rect x="16" y="82" width="70" height="5" rx="1" fill="#dc2626"/>
        <rect x="16" y="89" width="100" height="4" rx="1" fill="#374151"/>
        <rect x="126" y="89" width="50" height="3" rx="1" fill="#9ca3af"/>
        <rect x="16" y="96" width="80" height="3" rx="1" fill="#6b7280"/>
        <rect x="16" y="102" width="160" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="16" y="108" width="140" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="16" y="118" width="100" height="4" rx="1" fill="#374151"/>
        <rect x="126" y="118" width="50" height="3" rx="1" fill="#9ca3af"/>
        <rect x="16" y="125" width="80" height="3" rx="1" fill="#6b7280"/>
        <rect x="16" y="131" width="160" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="16" y="141" width="60" height="5" rx="1" fill="#dc2626"/>
        <rect x="16" y="148" width="110" height="4" rx="1" fill="#374151"/>
        <rect x="136" y="148" width="40" height="3" rx="1" fill="#9ca3af"/>
        <rect x="16" y="155" width="90" height="3" rx="1" fill="#6b7280"/>
        <rect x="16" y="165" width="50" height="5" rx="1" fill="#dc2626"/>
        <rect x="16" y="172" width="36" height="11" rx="5" fill="#fee2e2"/>
        <rect x="56" y="172" width="36" height="11" rx="5" fill="#fee2e2"/>
        <rect x="96" y="172" width="36" height="11" rx="5" fill="#fee2e2"/>
        <rect x="136" y="172" width="36" height="11" rx="5" fill="#fee2e2"/>
      </svg>
    ),
    8: (
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="200" height="260" fill="white"/>
        {/* Purple gradient header */}
        <defs>
          <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed"/>
            <stop offset="100%" stopColor="#db2777"/>
          </linearGradient>
        </defs>
        <rect width="200" height="70" fill="url(#purpleGrad)"/>
        <circle cx="30" cy="35" r="18" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5"/>
        <rect x="55" y="19" width="90" height="10" rx="2" fill="white"/>
        <rect x="55" y="32" width="70" height="5" rx="1" fill="rgba(255,255,255,0.75)"/>
        <rect x="55" y="41" width="40" height="3" rx="1" fill="rgba(255,255,255,0.55)"/>
        <rect x="100" y="41" width="40" height="3" rx="1" fill="rgba(255,255,255,0.55)"/>
        <rect x="145" y="41" width="35" height="3" rx="1" fill="rgba(255,255,255,0.55)"/>
        {/* Body */}
        <rect x="20" y="80" width="65" height="5" rx="1" fill="#7c3aed"/>
        <rect x="20" y="87" width="160" height="2" fill="#ede9fe"/>
        <rect x="20" y="92" width="160" height="3" rx="1" fill="#d1d5db"/>
        <rect x="20" y="98" width="130" height="3" rx="1" fill="#d1d5db"/>
        <rect x="20" y="108" width="70" height="5" rx="1" fill="#7c3aed"/>
        <rect x="20" y="115" width="160" height="2" fill="#ede9fe"/>
        <rect x="20" y="120" width="100" height="4" rx="1" fill="#374151"/>
        <rect x="130" y="120" width="50" height="3" rx="1" fill="#9ca3af"/>
        <rect x="20" y="127" width="80" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="133" width="160" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="20" y="139" width="140" height="3" rx="1" fill="#e5e7eb"/>
        <rect x="20" y="149" width="65" height="5" rx="1" fill="#7c3aed"/>
        <rect x="20" y="156" width="160" height="2" fill="#ede9fe"/>
        <rect x="20" y="161" width="110" height="4" rx="1" fill="#374151"/>
        <rect x="140" y="161" width="40" height="3" rx="1" fill="#9ca3af"/>
        <rect x="20" y="168" width="90" height="3" rx="1" fill="#6b7280"/>
        <rect x="20" y="178" width="45" height="5" rx="1" fill="#7c3aed"/>
        <rect x="20" y="185" width="160" height="2" fill="#ede9fe"/>
        <rect x="20" y="190" width="36" height="11" rx="5" fill="#ede9fe"/>
        <rect x="60" y="190" width="36" height="11" rx="5" fill="#ede9fe"/>
        <rect x="100" y="190" width="36" height="11" rx="5" fill="#ede9fe"/>
        <rect x="140" y="190" width="36" height="11" rx="5" fill="#ede9fe"/>
      </svg>
    ),
    9: (
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect width="200" height="260" fill="#fefce8"/>
        {/* Golden executive header */}
        <rect width="200" height="4" fill="#b45309"/>
        <rect x="20" y="14" width="160" height="13" rx="2" fill="#1c1917"/>
        <rect x="40" y="30" width="120" height="6" rx="2" fill="#b45309"/>
        <rect x="20" y="40" width="160" height="2" fill="#b45309"/>
        <rect x="25" y="46" width="45" height="3" rx="1" fill="#78716c"/>
        <rect x="78" y="46" width="10" height="3" rx="1" fill="#b45309"/>
        <rect x="95" y="46" width="45" height="3" rx="1" fill="#78716c"/>
        <rect x="148" y="46" width="10" height="3" rx="1" fill="#b45309"/>
        {/* Sections */}
        <rect x="20" y="58" width="60" height="5" rx="1" fill="#b45309"/>
        <rect x="20" y="65" width="160" height="1" fill="#d97706"/>
        <rect x="20" y="69" width="160" height="3" rx="1" fill="#d6d3d1"/>
        <rect x="20" y="75" width="130" height="3" rx="1" fill="#d6d3d1"/>
        <rect x="20" y="85" width="70" height="5" rx="1" fill="#b45309"/>
        <rect x="20" y="92" width="160" height="1" fill="#d97706"/>
        <rect x="20" y="96" width="100" height="4" rx="1" fill="#1c1917"/>
        <rect x="130" y="96" width="50" height="3" rx="1" fill="#a8a29e"/>
        <rect x="20" y="103" width="80" height="3" rx="1" fill="#78716c"/>
        <rect x="20" y="109" width="160" height="3" rx="1" fill="#e7e5e4"/>
        <rect x="20" y="115" width="140" height="3" rx="1" fill="#e7e5e4"/>
        <rect x="20" y="125" width="100" height="4" rx="1" fill="#1c1917"/>
        <rect x="130" y="125" width="50" height="3" rx="1" fill="#a8a29e"/>
        <rect x="20" y="132" width="80" height="3" rx="1" fill="#78716c"/>
        <rect x="20" y="138" width="160" height="3" rx="1" fill="#e7e5e4"/>
        <rect x="20" y="148" width="60" height="5" rx="1" fill="#b45309"/>
        <rect x="20" y="155" width="160" height="1" fill="#d97706"/>
        <rect x="20" y="159" width="110" height="4" rx="1" fill="#1c1917"/>
        <rect x="140" y="159" width="40" height="3" rx="1" fill="#a8a29e"/>
        <rect x="20" y="166" width="90" height="3" rx="1" fill="#78716c"/>
        <rect x="20" y="176" width="50" height="5" rx="1" fill="#b45309"/>
        <rect x="20" y="183" width="160" height="1" fill="#d97706"/>
        <rect x="20" y="188" width="36" height="11" rx="5" fill="#fef3c7"/>
        <rect x="60" y="188" width="36" height="11" rx="5" fill="#fef3c7"/>
        <rect x="100" y="188" width="36" height="11" rx="5" fill="#fef3c7"/>
        <rect x="140" y="188" width="36" height="11" rx="5" fill="#fef3c7"/>
        <rect width="200" height="4" fill="#b45309" y="256"/>
      </svg>
    ),
  };
  return svgs[id] || null;
};

const templates = [
  { id: 1, name: 'Modern Blue',       category: 'Professional', accent: '#1e40af', popular: true  },
  { id: 2, name: 'Minimalist Mono',   category: 'Simple',       accent: '#111827', popular: false },
  { id: 3, name: 'Navy Banner',       category: 'Bold',         accent: '#1e3a8a', popular: true  },
  { id: 4, name: 'Dark Sidebar',      category: 'Creative',     accent: '#0f172a', popular: false },
  { id: 5, name: 'Elegant Centered',  category: 'Classic',      accent: '#374151', popular: true  },
  { id: 6, name: 'Forest Green',      category: 'Creative',     accent: '#064e3b', popular: false },
  { id: 7, name: 'Corporate Red',     category: 'Bold',         accent: '#dc2626', popular: false },
  { id: 8, name: 'Purple Gradient',   category: 'Creative',     accent: '#7c3aed', popular: true  },
  { id: 9, name: 'Executive Gold',    category: 'Premium',      accent: '#b45309', popular: false },
];

const ResumeTemplates = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Professional', 'Simple', 'Bold', 'Creative', 'Classic', 'Premium'];

  const filtered = filter === 'All' ? templates : templates.filter(t => t.category === filter);

  const handleEdit = (tpl) => {
    navigate(`/app/template-editor/${tpl.id}`);
  };

  const handleDownload = (tpl) => {
    // Navigate to editor in download mode
    navigate(`/app/template-editor/${tpl.id}?download=true`);
  };

  return (
    <div className="templates-page">
      <div className="templates-hero">
        <h2 className="section-title">Resume Templates</h2>
        <p className="templates-subtitle">Choose a premium design. Click <strong>Edit</strong> to customize it and download your resume.</p>
      </div>

      {/* Filter Bar */}
      <div className="templates-filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="templates-grid">
        {filtered.map(tpl => (
          <div
            key={tpl.id}
            className={`template-card glass-card ${hoveredId === tpl.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredId(tpl.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {tpl.popular && (
              <div className="template-badge">
                <Star size={10} fill="currentColor" /> Popular
              </div>
            )}

            {/* Preview */}
            <div className="template-preview-wrapper">
              <TemplateSVG id={tpl.id} />
              {/* Hover overlay */}
              <div className="template-overlay">
                <button
                  className="overlay-btn edit-btn"
                  onClick={() => handleEdit(tpl)}
                >
                  <Edit3 size={15} /> Edit Template
                </button>
                <button
                  className="overlay-btn download-btn"
                  onClick={() => handleDownload(tpl)}
                >
                  <Download size={15} /> Quick Download
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="template-info">
              <div className="template-info-left">
                <span className="template-dot" style={{ backgroundColor: tpl.accent }} />
                <span className="template-name">{tpl.name}</span>
              </div>
              <span className="template-category">{tpl.category}</span>
            </div>

            {/* Action Buttons always visible below */}
            <div className="template-actions">
              <button className="btn-secondary tpl-btn" onClick={() => handleEdit(tpl)}>
                <Edit3 size={14} /> Edit
              </button>
              <button className="btn-primary tpl-btn" onClick={() => handleDownload(tpl)}>
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
