import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, ShoppingCart, Calendar, IndianRupee, 
  Store, CheckCircle2, Clock, Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShoppingList {
  id: string;
  name: string;
  store: string | null;
  budget: number | null;
  total_amount: number | null;
  purpose: string | null;
  quality: string | null;
  is_completed: boolean | null;
  created_at: string;
  completed_at: string | null;
}

export default function History() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user) {
      fetchLists();
    }
  }, [user]);

  const fetchLists = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('shopping_lists')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLists(data || []);
    } catch (error: any) {
      console.error('Error fetching lists:', error);
      toast({
        title: 'Error',
        description: 'Failed to load shopping history',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteList = async (listId: string) => {
    try {
      const { error } = await supabase
        .from('shopping_lists')
        .delete()
        .eq('id', listId);
      
      if (error) throw error;
      
      setLists(lists.filter(l => l.id !== listId));
      toast({
        title: 'List Deleted',
        description: 'Shopping list has been removed.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete list',
        variant: 'destructive',
      });
    }
  };

  const getStoreEmoji = (store: string | null) => {
    if (store === 'dmart') return '🏪';
    if (store === 'reliance') return '🛒';
    return '🏬';
  };

  const getPurposeLabel = (purpose: string | null) => {
    const labels: Record<string, string> = {
      everyday: 'Everyday Cooking',
      biryani: 'Biryani Special',
      party: 'Party/Celebration',
      healthy: 'Healthy Eating',
      quick: 'Quick Meals',
    };
    return labels[purpose || ''] || purpose || 'General';
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold gradient-text">Shopping History</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 max-w-2xl mx-auto">
        {lists.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Shopping History</h2>
            <p className="text-muted-foreground mb-4">
              Start your first shopping list to see your history here.
            </p>
            <Button onClick={() => navigate('/')}>
              Create New List
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {lists.map((list, index) => (
              <motion.div
                key={list.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getStoreEmoji(list.store)}</span>
                          <div>
                            <h3 className="font-semibold">{list.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {new Date(list.created_at).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {getPurposeLabel(list.purpose)}
                          </Badge>
                          {list.quality && (
                            <Badge variant="outline" className="text-xs">
                              {list.quality === 'premium' ? '⭐ Premium' : '💰 Budget'}
                            </Badge>
                          )}
                          {list.is_completed && (
                            <Badge className="text-xs bg-green-500/10 text-green-600 border-green-200">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          {list.budget && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <IndianRupee className="w-3 h-3" />
                              <span>Budget: ₹{list.budget}</span>
                            </div>
                          )}
                          {list.total_amount !== null && (
                            <div className="flex items-center gap-1 text-primary font-medium">
                              <IndianRupee className="w-3 h-3" />
                              <span>Spent: ₹{list.total_amount}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteList(list.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
