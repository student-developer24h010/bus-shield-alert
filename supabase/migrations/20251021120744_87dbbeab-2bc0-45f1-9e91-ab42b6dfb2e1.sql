-- Add missing INSERT and DELETE policies for profiles table
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);

-- Add INSERT policy for user_roles to support automatic role assignment
-- This ensures the handle_new_user() trigger can assign default roles
CREATE POLICY "System can assign default roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);