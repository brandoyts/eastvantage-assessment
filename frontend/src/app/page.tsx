"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";
import { CreateUserForm, Role } from "@/types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateUserPage() {
  const router = useRouter();
  const [rolesOptions, setRolesOptions] = useState<Role[]>([]);
  const [form, setForm] = useState<CreateUserForm>({ name: "", email: "", roles: [] });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Popover state
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles");
        setRolesOptions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoles();
  }, []);

  const selectedItems = form.roles
    .map(id => rolesOptions.find(r => r.id === id))
    .filter(Boolean) as Role[];

  const handleSelect = (role: Role) => {
    if (!form.roles.includes(role.id)) {
      setForm(prev => ({ ...prev, roles: [...prev.roles, role.id] }));
    }
    setInputValue("");
  };

  const handleRemove = (role: Role) => {
    setForm(prev => ({ ...prev, roles: prev.roles.filter(r => r !== role.id) }));
  };

  const filteredOptions = rolesOptions.filter(
    role => role.name.toLowerCase().includes(inputValue.toLowerCase()) && !form.roles.includes(role.id)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/users", form);

      if (response) {
        setForm({ name: "", email: "", roles: [] })
        setErrors({})
        router.push("/users")
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ errors: Record<string, string[]> }>;
      if (axiosErr.response?.status === 422) {
        setErrors(axiosErr.response?.data.errors ?? {});
      } else {
        console.error(err);
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full mb-4">
        <Link
          href="/users"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Go to users page
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Create User</h1>

        <div className="flex flex-col gap-1">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter full name"
            required
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter email"
            required
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        {/* Roles Popover Multi-Select */}
        <div className="flex flex-col gap-1">
          <Label>Roles</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px] items-center cursor-pointer">
                {selectedItems.map(item => (
                  <Badge key={item.id} variant="secondary" className="flex items-center gap-1">
                    {item.name}
                    <button type="button" onClick={() => handleRemove(item)} className="ml-1 text-xs">x</button>
                  </Badge>
                ))}
                <Input
                  placeholder="Search..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  className="flex-grow border-none p-0 focus:ring-0"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {filteredOptions.map(option => (
                      <CommandItem key={option.id} onSelect={() => handleSelect(option)}>
                        {option.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
          {loading ? "Creating..." : "Create User"}
        </Button>
      </form>
    </div>
  );
}
