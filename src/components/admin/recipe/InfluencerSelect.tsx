import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { type Influencer } from "@/types/influencer";
import { supabase } from "@/lib/supabase";

interface InfluencerSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function InfluencerSelect({ value, onChange }: InfluencerSelectProps) {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInfluencers() {
      try {
        const { data, error } = await supabase
          .from('influencers')
          .select('*');

        if (error) throw error;

        if (data) {
          setInfluencers(data.map(influencer => ({
            id: influencer.id,
            name: influencer.name,
            avatar: influencer.avatar_url,
            coverImage: influencer.cover_image_url,
            bio: influencer.bio,
            socialMedia: influencer.social_media,
            specialties: influencer.specialties || [],
            followers: influencer.followers,
            recipesCount: influencer.recipes_count
          })));
        }
      } catch (error) {
        console.error('Error loading influencers:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInfluencers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-2">
        <Label>Influencer</Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Loading influencers..." />
          </SelectTrigger>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Influencer</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an influencer" />
        </SelectTrigger>
        <SelectContent>
          {influencers.map((influencer) => (
            <SelectItem key={influencer.id} value={influencer.id}>
              {influencer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}