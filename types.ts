import React from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'seeds' | 'fertilizer' | 'tools' | 'machinery' | 'crop';
  image: string;
  seller: string;
  location: string;
  rating: number;
  type: 'buy' | 'sell';
  isRentable?: boolean; // New field for rental items
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: { day: string; temp: number; icon: React.ReactNode }[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isError?: boolean;
}

export interface Scheme {
  id: string;
  title: string;
  provider: string; // e.g., "Central Govt" or "State"
  description: string;
  benefit: string;
  deadline?: string;
  category: 'financial' | 'insurance' | 'equipment';
}

export interface ForumPost {
  id: string;
  author: string;
  role: string; // e.g., "Senior Farmer"
  content: string;
  likes: number;
  comments: number;
  time: string;
  image?: string;
}

export interface MandiRate {
  id: string;
  commodity: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface CropLifecycle {
  id: string;
  name: string;
  variety: string;
  sownDate: string;
  harvestDate: string;
  stage: 'Sowing' | 'Germination' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvest';
  progress: number; // 0 to 100
  health: 'Good' | 'Average' | 'Risk';
  image: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}