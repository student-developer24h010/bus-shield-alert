# GN TRVELS - Bus Tracking & Safety System

A comprehensive web application for bus fleet management, real-time tracking, and passenger safety.

## 🚀 Features

### For Passengers
- **Real-time GPS Tracking**: Track your bus location in real-time
- **SOS Emergency Alert**: One-tap emergency alert to police, office, and family
- **Safety Notifications**: Automatic alerts when GPS connectivity issues occur
- **Contact Management**: Quick access to travel office and family contacts

### For Administrators
- **Fleet Management**: Monitor all buses in the fleet
- **Active Alerts Dashboard**: View and manage active alerts in real-time
- **Route Tracking**: View individual bus routes
- **Engine Control**: Remote engine management based on GPS status
- **Driver Monitoring**: Track driver assignments and bus status

### Security Features
- **Automatic Engine Shutdown**: Bus engine automatically disables if GPS disconnects
- **Role-Based Access Control**: Separate interfaces for passengers, parents, drivers, and admins
- **Secure Authentication**: Email-based authentication with auto-confirmation
- **Real-time Safety Alerts**: Instant notifications for safety events

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI + shadcn/ui
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **State Management**: TanStack Query (React Query)
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # Reusable UI components (shadcn/ui)
├── hooks/               # Custom React hooks
├── integrations/
│   └── supabase/        # Supabase client & types
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Splash.tsx       # Initial splash screen
│   ├── Onboarding.tsx   # Onboarding flow
│   ├── Auth.tsx         # Login/Signup
│   ├── Dashboard.tsx    # Passenger dashboard
│   ├── Admin.tsx        # Admin control panel
│   ├── SOS.tsx          # Emergency alert page
│   ├── EngineControl.tsx # Engine status alerts
│   └── NotFound.tsx     # 404 page
└── App.tsx              # Main app component with routing
```

## 🗄️ Database Schema

### Tables

#### `profiles`
Stores user profile information
- `id` (uuid, primary key)
- `full_name` (text)
- `phone` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `user_roles`
Manages user roles and permissions
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `role` (enum: 'passenger', 'parent', 'driver', 'admin')
- `created_at` (timestamp)

### Enums
- `app_role`: passenger, parent, driver, admin

### Row-Level Security (RLS)
All tables have RLS enabled with appropriate policies:
- Users can view/update their own profiles
- Admins can view all profiles and manage roles
- Users can view their own roles

## 🔐 Authentication Flow

1. **Splash Screen** → Auto-redirects to onboarding after 2 seconds
2. **Onboarding** → 3-step feature introduction
3. **Auth Page** → Email/password signup or login
4. **Role Check** → Redirects based on user role:
   - Admin → `/admin`
   - Others → `/dashboard`

### Creating User Accounts

1. Navigate to the Auth page (`/auth`)
2. Click "Sign Up"
3. Enter:
   - Full Name
   - Phone Number
   - Email
   - Password
4. Submit - account is auto-confirmed
5. Automatic redirect based on assigned role

### Default Roles
- New users are assigned the `passenger` role by default
- Admins must be manually assigned via database

## 🎨 Design System

The application uses a comprehensive design system defined in:
- `src/index.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind theme configuration

### Color Tokens
All colors use HSL format with semantic naming:
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--muted` / `--muted-foreground`
- `--accent` / `--accent-foreground`
- `--destructive` / `--destructive-foreground`
- `--sos-red` / `--sos-red-foreground` (for emergency features)

### Dark Mode Support
Full dark mode support with automatic theme switching

## 🚦 User Flows

### Passenger Flow
1. Login → Dashboard
2. View bus location on map
3. Access SOS button if needed
4. Contact office or family

### Admin Flow
1. Login → Admin Panel
2. View active alerts
3. Monitor fleet status
4. Manage individual buses
5. View routes and control engines

### Emergency (SOS) Flow
1. Press SOS button on dashboard
2. Alert sent to:
   - Local police
   - Travel office
   - Family contacts
3. Confirmation shown
4. Auto-redirect to dashboard

## 📱 Pages & Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Splash | Public | Initial landing with logo |
| `/onboarding` | Onboarding | Public | Feature introduction |
| `/auth` | Auth | Public | Login/Signup |
| `/dashboard` | Dashboard | Authenticated | Passenger dashboard |
| `/admin` | Admin | Admin only | Fleet management |
| `/sos` | SOS | Authenticated | Emergency alert |
| `/engine-control` | EngineControl | Admin only | Engine status alerts |
| `*` | NotFound | Public | 404 error page |

## 🔧 Environment Variables

Required environment variables (auto-configured via Lovable Cloud):
```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
npm run build
```

## 🔒 Security Features

1. **Row-Level Security (RLS)**: All database tables protected
2. **Role-Based Access**: Separate permissions for each role
3. **Security Definer Functions**: Prevent infinite recursion in policies
4. **Auto-confirm Email**: Enabled for faster testing (disable in production)
5. **Session Persistence**: Secure session management via localStorage

## 📊 Key Components

### UI Components (shadcn/ui)
- Button, Card, Badge, Alert
- Dialog, Sheet, Drawer
- Form, Input, Label
- Toast notifications
- And 40+ more components

### Custom Hooks
- `useToast`: Toast notification management
- `useMobile`: Responsive breakpoint detection

## 🐛 Troubleshooting

### Authentication Issues
- Ensure auto-confirm email is enabled in backend settings
- Check that user has been assigned a role in `user_roles` table
- Verify redirect URLs are configured correctly

### GPS Tracking
- Placeholder implementation - integrate with actual GPS API
- Update map component with real-time coordinates

### Database Access
- All database operations require authentication
- Check RLS policies if access is denied
- Verify user roles are correctly assigned

## 🎯 Future Enhancements

- Real GPS integration with mapping service
- Push notifications for alerts
- Real-time WebSocket updates
- Driver mobile app
- Parent tracking portal
- SMS alert integration
- Geofencing capabilities
- Historical route playback
- Performance analytics

## 📄 License

This project is private and proprietary.

## 🤝 Support

For technical support or questions, contact the development team.

---

**Built with ❤️ using Lovable**
