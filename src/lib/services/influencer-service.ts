import { type Influencer, type SocialMedia } from '@/types/influencer';
import { type DbInfluencer } from '@/types/database';
import { supabase } from '@/lib/supabase';

function mapDbInfluencerToInfluencer(dbInfluencer: DbInfluencer): Influencer {
  const socialMedia = (dbInfluencer.social_media || []).map(social => ({
    platform: social.platform as SocialMedia['platform'],
    url: social.url,
    username: social.username
  }));

  return {
    id: dbInfluencer.id,
    name: dbInfluencer.name,
    avatar: dbInfluencer.avatar_url,
    coverImage: dbInfluencer.cover_image_url,
    bio: dbInfluencer.bio,
    socialMedia,
    specialties: dbInfluencer.specialties || [],
    followers: dbInfluencer.followers,
    recipesCount: dbInfluencer.recipes_count
  };
}

export const InfluencerService = {
  getAll: async (): Promise<Influencer[]> => {
    const { data: influencers, error } = await supabase
      .from('influencers')
      .select('*');

    if (error) throw error;
    if (!influencers) return [];

    return influencers.map(mapDbInfluencerToInfluencer);
  },

  // ... rest of the service methods remain the same
};