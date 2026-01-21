import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  User, Settings, ShoppingCart, TrendingUp, Calendar, 
  LogOut, ChevronLeft, Save, Bell, Shield, Palette,
  Store, Users, Salad, Sparkles, Trophy, Package, Mail
} from 'lucide-react';

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
  dietary_preference: string | null;
  quality_preference: string | null;
  family_size: number | null;
  ai_personality: string | null;
  favorite_store: string | null;
}

interface Stats {
  totalLists: number;
  totalSpent: number;
  totalSaved: number;
  achievements: number;
}

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<Profile>({
    display_name: '',
    avatar_url: null,
    dietary_preference: 'none',
    quality_preference: 'budget',
    family_size: 2,
    ai_personality: 'friendly',
    favorite_store: 'dmart',
  });
  const [stats, setStats] = useState<Stats>({
    totalLists: 0,
    totalSpent: 0,
    totalSaved: 0,
    achievements: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }
      
      if (data) {
        setProfile({
          display_name: data.display_name || user.user_metadata?.full_name || '',
          avatar_url: data.avatar_url,
          dietary_preference: data.dietary_preference || 'none',
          quality_preference: data.quality_preference || 'budget',
          family_size: data.family_size || 2,
          ai_personality: data.ai_personality || 'friendly',
          favorite_store: data.favorite_store || 'dmart',
        });
      } else {
        // Use auth metadata if no profile exists
        setProfile(prev => ({
          ...prev,
          display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
        }));
      }
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const fetchStats = async () => {
    if (!user) return;
    
    try {
      // Fetch shopping lists count
      const { count: listsCount } = await supabase
        .from('shopping_lists')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      // Fetch spending records
      const { data: spending } = await supabase
        .from('spending_records')
        .select('amount, saved_amount')
        .eq('user_id', user.id);
      
      // Fetch achievements count
      const { count: achievementsCount } = await supabase
        .from('achievements')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      const totalSpent = spending?.reduce((sum, r) => sum + (r.amount || 0), 0) || 0;
      const totalSaved = spending?.reduce((sum, r) => sum + (r.saved_amount || 0), 0) || 0;
      
      setStats({
        totalLists: listsCount || 0,
        totalSpent,
        totalSaved,
        achievements: achievementsCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          display_name: profile.display_name,
          dietary_preference: profile.dietary_preference,
          quality_preference: profile.quality_preference,
          family_size: profile.family_size,
          ai_personality: profile.ai_personality,
          favorite_store: profile.favorite_store,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
      
      if (error) throw error;
      
      toast({
        title: 'Profile Updated! ✨',
        description: 'Your preferences have been saved successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading || isLoadingProfile) {
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

  const displayName = profile.display_name || user.email?.split('@')[0] || 'User';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold gradient-text">Dashboard</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="container px-4 py-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-4 border-primary/20">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Hi, {displayName}! 👋</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Smart Shopper
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">{stats.totalLists}</p>
              <p className="text-xs text-muted-foreground">Shopping Lists</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold">₹{stats.totalSpent.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold">₹{stats.totalSaved.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Saved</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
                <Package className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold">{stats.achievements}</p>
              <p className="text-xs text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and how Agent GroceryGuru addresses you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profile.display_name || ''}
                      onChange={(e) => setProfile(p => ({ ...p, display_name: e.target.value }))}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="familySize">Family Size</Label>
                    <Select 
                      value={String(profile.family_size || 2)}
                      onValueChange={(v) => setProfile(p => ({ ...p, family_size: parseInt(v) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Just me (1)</SelectItem>
                        <SelectItem value="2">Couple (2)</SelectItem>
                        <SelectItem value="3">Small family (3)</SelectItem>
                        <SelectItem value="4">Family (4)</SelectItem>
                        <SelectItem value="5">Large family (5+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Shopping Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize your shopping experience and AI recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Store className="w-4 h-4" />
                      Favorite Store
                    </Label>
                    <Select 
                      value={profile.favorite_store || 'dmart'}
                      onValueChange={(v) => setProfile(p => ({ ...p, favorite_store: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dmart">DMart 🏪</SelectItem>
                        <SelectItem value="reliance">Reliance Smart 🛒</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Salad className="w-4 h-4" />
                      Dietary Preference
                    </Label>
                    <Select 
                      value={profile.dietary_preference || 'none'}
                      onValueChange={(v) => setProfile(p => ({ ...p, dietary_preference: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No restrictions</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian 🥗</SelectItem>
                        <SelectItem value="vegan">Vegan 🌱</SelectItem>
                        <SelectItem value="keto">Keto 🥩</SelectItem>
                        <SelectItem value="diet">Diet / Weight loss 🏃</SelectItem>
                        <SelectItem value="gym">Gym / High protein 💪</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Quality Preference
                    </Label>
                    <Select 
                      value={profile.quality_preference || 'budget'}
                      onValueChange={(v) => setProfile(p => ({ ...p, quality_preference: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget-friendly 💰</SelectItem>
                        <SelectItem value="premium">Premium quality ⭐</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      AI Personality
                    </Label>
                    <Select 
                      value={profile.ai_personality || 'friendly'}
                      onValueChange={(v) => setProfile(p => ({ ...p, ai_personality: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly & Casual 😊</SelectItem>
                        <SelectItem value="professional">Professional 👔</SelectItem>
                        <SelectItem value="funny">Funny & Quirky 🎭</SelectItem>
                        <SelectItem value="brief">Brief & Concise 📝</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email Address</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Member Since</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex-col gap-2"
                  onClick={() => navigate('/')}
                >
                  <ShoppingCart className="w-6 h-6 text-primary" />
                  <span>New List</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex-col gap-2"
                  onClick={() => navigate('/history')}
                >
                  <Calendar className="w-6 h-6 text-primary" />
                  <span>History</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
