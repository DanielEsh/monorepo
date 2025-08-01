import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {supabaseServer} from "../../../shared/lib/supabase";

const schema = z.object({
    name: z.string().min(1).max(50),
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabaseServer
        .from("attributes")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("id", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, total: count }, { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    // const result = schema.safeParse(body);
    // if (!result.success) {
    //     return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
    // }

    const { name, label, type, description } = body;

    const { error } = await supabaseServer.from("attributes").insert({ name, label, type, description });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}