import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardCheck,
} from 'lucide-react';
import { NavLink } from './navLink';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Partner Management', icon: Users, href: '/partner' },
  { name: 'Order Management', icon: Package, href: '/orders' },
  { name: 'Assignment Management', icon: ClipboardCheck, href: '/assignment' },
];

export function Sidebar() {
  // Always collapsed
  const collapsed = true;

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen
        w-20 /* always collapsed width */
        border-r border-dark-700
        bg-dark-800/80 backdrop-blur-md
        shadow-glow
      `}
    >
      <div className="flex h-full flex-col">
        {/* Logo / Header Section (optional) */}
        <div className="flex h-16 items-center justify-center border-b border-dark-700">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAs
                  TAAALEwEAmpwYAAAB7UlEQVR4nO2XzUpVURSAT2ChYYWKo1Bw3KAXaGBPIBI6cWI26AnEKHyAeoboDdKG
                  zRw4TE10r31vF9R+aJDlvWsdO2tngUv2lYggzj7kOboO7A/W7K7N+lg/nJskkUgkEimbu+a15EUo3zqSQ
                  sH0HRib1uGycXR/C3GgXgLu7wAmBMbHH0X6ailg/8Rbw+3ROgsIOPr0Lstu1lbAnkq82RPpra2A7S46Pq
                  q1ADBhadepaIFF3mjI12s2SydPz2j+ew1Hs+oEfmMQB/3C5u8CLqkV8ADjVP4YYTPRLNCSb9cDe5CqFti
                  R9o38S0SZaoFG1rkX6MCe6iW2jK3AEr9UJ+DnHhinQxfIh3H48FwFygxgSr1sjQXwSanFn6cAOFr/r485
                  JQLvz/Sf4IIFNrb5YKSS4qsUACa0jItG5EplxVcpYBhnKi28qMC/cvw8W6bDQO4HI1/6VQp08xgXwp3Ap
                  2oFVkR6LNNmbj7jr+2j9m2VAh7D6R1gPA50YVVELqkU6OYzvgheJEdzegWIhsDhfuCdg1aaDqsU8IBLHw
                  QXmvG5WgE/48C0kjtGjMcN1xlXKeCBo8NblvFnoAtmTeSySgGPdfgsuNBM84lWgTX5fBWYdvO7QFnTdcZ
                  UCnjgRzpRYKFfdX8ciUQikaRETgBZo2mmEtS4AgAAAABJRU5ErkJggg=="
              alt="dummyLogo"
        />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              {...item}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
