import bcrypt from 'bcryptjs';
import { verifyToken } from '../utils/jwtUtils.js';

import supabase from '../supabase.js';

export const registerUser = async (name, email, password, role = 'user') => {
  // Validate required fields
  if (!name) throw new Error('Name is required');
  if (!email) throw new Error('Email is required');
  if (!password) throw new Error('Password is required');
  const roles = ['user', 'admin'];
  if (!roles.includes(role)) {
    throw new Error('Invalid role');
  }

  // Validate email format
  const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!validEmailRegex.test(email)) {
    throw new Error('Email must be a valid domain');
  }

  // Validate password format
  const validPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  if (!validPasswordRegex.test(password)) {
    throw new Error('Password must be at least 8 characters long, alphanumeric, contain at least one uppercase letter, and no special characters');
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  const { data: profile, error: insertError } = await supabase
    .from('profiles')
    .insert([
      {
        user_id: data.user.id,
        name: name,
        email: email,
        role: role,
      }
    ])
    .select('*')
    .single();

  console.log('Insert response:', { profile, insertError });

  if (insertError) {
    throw new Error(insertError.message);
  }

  return profile;
};

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

export const loginUser = async (email, password) => {
  if (!email) throw new Error('Email is required');
  if (!password) throw new Error('Password is required');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || !data.session || !data.session.access_token) {
    throw new Error("Failed to retrieve access token.");
  }

  return data.session.access_token;
};

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error("Failed to fetch user: " + error.message);
  }

  return data;
};


export const getAllUser = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'user');

  if (error) {
    throw error;
  }

  return data;
};