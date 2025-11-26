import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  listingId?: string;
  listingTitle?: string;
  isRead: boolean;
  createdAt: string;
}

interface DbMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  listing_id: string | null;
  listing_title: string | null;
  is_read: boolean | null;
  created_at: string;
}

const mapDbToMessage = (db: DbMessage): Message => ({
  id: db.id,
  name: db.name,
  email: db.email,
  phone: db.phone || undefined,
  subject: db.subject || undefined,
  message: db.message,
  listingId: db.listing_id || undefined,
  listingTitle: db.listing_title || undefined,
  isRead: db.is_read || false,
  createdAt: db.created_at,
});

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setMessages((data || []).map(mapDbToMessage));
    } catch (error) {
      console.error('Failed to load messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const sendMessage = async (messageData: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    listingId?: string;
    listingTitle?: string;
  }) => {
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          name: messageData.name,
          email: messageData.email,
          phone: messageData.phone || null,
          subject: messageData.subject || null,
          message: messageData.message,
          listing_id: messageData.listingId || null,
          listing_title: messageData.listingTitle || null,
        });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Failed to send message:', error);
      return { error };
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
      return { error: null };
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      return { error };
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => prev.filter(m => m.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Failed to delete message:', error);
      return { error };
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    markAsRead,
    deleteMessage,
    refreshMessages: loadMessages,
  };
};
