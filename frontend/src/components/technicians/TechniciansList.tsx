MasterChief #WolfGang
saichetan338
Online

MasterChief #WolfGang — 09-06-2025 13:05
😏
Welcome, 
Dineshs7
. We hope you brought pizza. — 09-06-2025 13:09
Dineshs7 — 09-06-2025 13:10
hi
🫡
 hopped into the server. — 10-06-2025 09:41
MasterChief #WolfGang — 10-06-2025 09:41
-- 1. Apartments Table
CREATE TABLE Apartments (
    apartment_serial INT PRIMARY KEY,
    apartment_name VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL
);

-- 2. ApartmentUnits Table
CREATE TABLE ApartmentUnits (
    unit_id INT PRIMARY KEY,
    apartment_serial INT NOT NULL,
    floor_number INT NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    FOREIGN KEY (apartment_serial) REFERENCES Apartments(apartment_serial)
);

-- 3. Owners Table
CREATE TABLE Owners (
    owner_id INT PRIMARY KEY,
    unit_id INT NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    occupation VARCHAR(100),
    FOREIGN KEY (unit_id) REFERENCES ApartmentUnits(unit_id)
);

-- 4. Technicians Table
CREATE TABLE Technicians (
    technician_id INT PRIMARY KEY,
    apartment_serial INT NOT NULL,
    technician_type VARCHAR(50) NOT NULL,
    technician_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    service_description VARCHAR(200),
    FOREIGN KEY (apartment_serial) REFERENCES Apartments(apartment_serial)
);
BHARY — 10-06-2025 11:01
hey lovable I want to create a website where 
top left the name is Fix my flat which acts like home button as well and for that I need this component. 
<template>
  <div class="z-10 flex h-56 w-full flex-col items-center justify-center">
    <GradientButton :bg-color="bgColor">Zooooooooooom 🚀</GradientButton>
  </div>
Expand
message.txt
3 KB
BHARY — 10-06-2025 11:31
fix-my-flat/
├── node_modules/           # Installed dependencies (auto-generated)
├── public/                 # Public assets like favicon or index.html
│   └── vite.svg            # (Default icon from Vite, can be deleted)
├── src/                    # Your app code goes here
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── HeroCard.jsx
│   │   ├── HowToRegister.jsx
│   │   ├── HowToRegister.css
│   │   ├── OurUsers.jsx
│   │   └── OurUsers.css
│   ├── pages/
│   │   ├── Index.jsx
│   │   └── Index.css
│   ├── App.jsx             # Main app layout
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles (optional)
├── .gitignore              # Ignore node_modules and build
├── package.json            # Project metadata and dependencies
├── vite.config.js          # Vite config file
└── README.md               # Project intro (optional)
BHARY — 10-06-2025 12:25
Attachment file type: archive
src.zip
8.80 KB
Dineshs7 — 10-06-2025 18:16
https://www.instagram.com/reel/DKRpXK7SkNh/?igsh=azV2bmltNnNxZ3lq

thatcoderslaugh
Based on a true story
.
.
.
#chatgpt #codinghumor #viral #relatable #reels
Likes
56851

Instagram
MasterChief #WolfGang — 11-06-2025 11:08
https://github.com/SaiChetan338/flat-fix-dashboard.git
🫡 — 11-06-2025 11:19
https://github.com/Nitin-Penupala/village-nexus-connect
GitHub
GitHub - Nitin-Penupala/village-nexus-connect
Contribute to Nitin-Penupala/village-nexus-connect development by creating an account on GitHub.
Contribute to Nitin-Penupala/village-nexus-connect development by creating an account on GitHub.
🫡 — 11-06-2025 13:07
Image
Image
BHARY — 11-06-2025 13:24
Attachment file type: archive
apartment-website.zip
213.30 KB
rushik4786 — 11-06-2025 20:18
user auth done!
dashboard rontend codes pettandi 
🫡 — 11-06-2025 20:22
neeku rendu ikkade unnayi
🫡 — 11-06-2025 20:23
this is completed fully
🫡 — 11-06-2025 20:23
indhulo inka sidebar modifications unnayi
rushik4786 — 11-06-2025 20:23
okok
login page and dahsboard theme different annaru ga uncle
adhi chudadndi
🫡 — 11-06-2025 20:24
ok
🫡 — 11-06-2025 20:24
nuvu edi vaaduthav?
BHARY — 11-06-2025 20:50
Yeahh. Will be refining it
We will do tomorrow
🫡 — 11-06-2025 20:59
ok
🫡 — 12-06-2025 10:06
import { useState } from "react";
import { Search, Plus, Users, Home, Phone, Mail, AlertCircle, CheckCircle, Filter, Send, Menu, X, Shield, Wrench, LogOut, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
Expand
Index.jsx
27 KB
rushik4786 — 12-06-2025 10:53
http://192.168.182.1:8080/
Dineshs7 — 12-06-2025 10:53
http://192.168.29.133:8080/
🫡 — 12-06-2025 13:17
https://github.com/Nitin-Penupala/community-project
GitHub
GitHub - Nitin-Penupala/community-project
Contribute to Nitin-Penupala/community-project development by creating an account on GitHub.
Contribute to Nitin-Penupala/community-project development by creating an account on GitHub.
MasterChief #WolfGang — 15-06-2025 11:54
i guess we need to change resident registration form a bit
we should include number of house owned by the person..if we need to tackle what uncle explained to us
BHARY — 15-06-2025 13:01
Yeah. We will work on it.
MasterChief #WolfGang — 17-06-2025 10:16
https://github.com/SaiChetan338/flat-fix-dashboard.git
GitHub
GitHub - SaiChetan338/flat-fix-dashboard
Contribute to SaiChetan338/flat-fix-dashboard development by creating an account on GitHub.
Contribute to SaiChetan338/flat-fix-dashboard development by creating an account on GitHub.
MasterChief #WolfGang — 17-06-2025 12:27
https://skribbl.io/?omCKNohp
skribbl - Free Multiplayer Drawing & Guessing Game
skribbl - Free Multiplayer Drawing & Guessing Game
skribbl io is a free multiplayer drawing and guessing game. Draw and guess words with your friends and people all around the world! Score the most points and be the winner!
skribbl - Free Multiplayer Drawing & Guessing Game
Dineshs7 — 19-06-2025 13:20
const express = require("express");
const router = express.Router();
const Apartment = require("../models/Apartment");
//const User = require("../models/User");
const Complaint = require("../models/Complaint");
const bcrypt = require("bcryptjs");
Expand
message.txt
7 KB
Dineshs7 — 19-06-2025 13:32
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Users, Home, User } from 'lucide-react';
import axios from 'axios';

interface Neighbor {
Expand
message.txt
5 KB
Dineshs7 — 20-06-2025 10:43
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Users, Home, User } from 'lucide-react';
import axios from 'axios';

interface Neighbor {
Expand
message.txt
5 KB
// GET /neighbors?apartmentCode=XYZ123&excludeFlat=101
// Corrected route
const User = require('../models/User');

router.get('/neighbors/:apartmentCode', async (req, res) => {
  const { apartmentCode } = req.params;

  try {
    // Find users where apartmentCode matches directly (NO populate needed)
    const neighbors = await User.find({ apartmentCode })
      .select('-password') // Exclude password
      .exec();

    res.status(200).json({ neighbors });
  } catch (err) {
    console.error("Error fetching neighbors:", err);
    res.status(500).json({ message: "Server error" });
  }
});
Dineshs7 — 20-06-2025 12:22
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Wrench, CheckCircle, AlertCircle, MessageSquare, Filter } from 'lucide-react';
Expand
message.txt
7 KB
🫡 — 20-06-2025 12:49
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Users, Home, User } from 'lucide-react';
import axios from 'axios';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
Expand
message.txt
8 KB
Dineshs7 — 20-06-2025 13:34
https://codenames.game/room/sumo-luck-desk
Join me for a game of Codenames
You are invited to join a Codenames game.
Image
BHARY — 23-06-2025 10:18
CreateTicketForm.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
Expand
message.txt
10 KB
Dineshs7 — 23-06-2025 11:24
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
Expand
message.txt
10 KB
BHARY — 23-06-2025 11:31
TicketManagement.tsx
after removing Assigned section.
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
Expand
message.txt
10 KB
MasterChief #WolfGang — 23-06-2025 11:43
https://skribbl.io/?iJCnNrB9
skribbl - Free Multiplayer Drawing & Guessing Game
skribbl - Free Multiplayer Drawing & Guessing Game
skribbl io is a free multiplayer drawing and guessing game. Draw and guess words with your friends and people all around the world! Score the most points and be the winner!
skribbl - Free Multiplayer Drawing & Guessing Game
Dineshs7 — 23-06-2025 11:46
https://codenames.game/room/sumo-luck-desk
Join me for a game of Codenames
You are invited to join a Codenames game.
Image
MasterChief #WolfGang — Yesterday at 12:56
Whole frontend code.. Is hard coded with routing URL... 🤙😶‍🌫
MasterChief #WolfGang — Yesterday at 13:58
http://nivasa-production-7aa9.up.railway.app/
flat-fix-dashboard
Lovable Generated Project
flat-fix-dashboard
MasterChief #WolfGang
 pinned a message to this channel. See all pinned messages. — Yesterday at 13:58
MasterChief #WolfGang — 09:30
https://github.com/sai117/Nivasa.git
GitHub
GitHub - sai117/Nivasa
Contribute to sai117/Nivasa development by creating an account on GitHub.
GitHub - sai117/Nivasa
🫡 — 09:31
https://github.com/Nitin-Penupala
GitHub
Nitin-Penupala - Overview
Nitin-Penupala has 3 repositories available. Follow their code on GitHub.
Image
Dineshs7 — 09:54
const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^[0-9]{10}$/, 'Please fill a valid 10-digit phone number']
    },
    specialty: {
        type: String,
        required: true,
        enum: ['Plumbing', 'Electrical', 'HVAC', 'General Maintenance', 'Carpentry']
    },
    status: {
        type: String,
        required: true,
        enum: ['available', 'busy', 'offline'],
        default: 'available'
    },
    apartmentCode: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Technician', technicianSchema);
const express = require('express');
const router = express.Router();
const Technician = require('../models/Technician');

// GET all technicians for a specific apartment
router.get('/all-technicians', async (req, res) => {
Expand
message.txt
9 KB
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, Search, UserPlus, Wrench, Trash2 } from 'lucide-react';
import TechnicianForm from './TechnicianForm';
Expand
message.txt
12 KB
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
Expand
message.txt
9 KB
import { useState, useEffect } from 'react';
import {
  Building2, Ticket, Users, Wrench, LogOut, Menu, X,
  DollarSign, User as UserIcon, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
Expand
message.txt
12 KB
import { useState } from 'react';
import { Building2, Plus, Ticket, LogOut, Menu, X, Users, DollarSign, User as UserIcon, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CreateTicketForm from '@/components/tickets/CreateTicketForm';
Expand
message.txt
10 KB
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Wrench } from 'lucide-react';

interface Technician {
Expand
message.txt
5 KB
﻿
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Wrench } from 'lucide-react';

interface Technician {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialty: string;
  apartmentCode: string;
  status: 'available' | 'busy' | 'offline';
}

interface TechniciansListProps {
  apartmentCode: string;
  isAdmin?: boolean;
}

const TechniciansList = ({ apartmentCode, isAdmin = false }: TechniciansListProps) => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/all-technicians?apartmentCode=${apartmentCode}`);
        if (!response.ok) throw new Error('Failed to fetch technicians');
        const data = await response.json();
        
        const mappedTechnicians = data.map((tech: any) => ({
          id: tech._id,
          name: tech.name,
          phone: tech.phone,
          email: tech.email,
          specialty: tech.specialty,
          apartmentCode: tech.apartmentCode,
          status: tech.status
        }));
        
        setTechnicians(mappedTechnicians);
      } catch (error) {
        console.error('Error fetching technicians:', error);
        // Fallback to empty array if API fails
        setTechnicians([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (apartmentCode) {
      fetchTechnicians();
    }
  }, [apartmentCode]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'busy': return 'destructive';
      case 'offline': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Wrench className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Technicians</h2>
      </div>

      {technicians.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No technicians found for this apartment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technicians.map((technician) => (
            <Card key={technician.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{technician.name}</span>
                  <Badge variant={getStatusColor(technician.status) as any}>
                    {technician.status.charAt(0).toUpperCase() + technician.status.slice(1)}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  <Badge variant="secondary">{technician.specialty}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>{technician.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="truncate">{technician.email}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechniciansList;