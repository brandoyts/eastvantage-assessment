"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Role, User } from "@/types";
import Link from "next/link";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/users"); // fetch all users with roles
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Group users by role name
    const groupedByRole: Record<string, User[]> = {};
    users.forEach(user => {
        user.roles.forEach(role => {
            if (!groupedByRole[role.name]) groupedByRole[role.name] = [];
            groupedByRole[role.name].push(user);
        });
    });

    if (loading) return <p className="text-center mt-10">Loading users...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-semibold"
            >
                Create a new user
            </Link>
            <div className="flex justify-between items-center my-6">
                <h1 className="text-3xl font-bold">Users by Roles</h1>
            </div>

            {Object.entries(groupedByRole).map(([roleName, roleUsers]) => (
                <div key={roleName} className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">{roleName}</h2>
                    <ul className="list-disc list-inside">
                        {roleUsers.map(user => (
                            <li key={user.id}>
                                {user.name} ({user.email})
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}