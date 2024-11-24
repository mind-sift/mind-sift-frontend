import { createClient } from '@/app/utils/supabase/server'
import { NextResponse } from 'next/server'

interface Category {
  name: string
  description: string
  active: boolean
}

export async function GET() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categoriesConfig')
    .select('*')
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  
  const { error } = await supabase
    .from('categoriesConfig')
    .update({ active: body.active })
    .eq('name', body.name)
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const categories: Category[] = await request.json()
  
  const promises = categories.map((category) =>
    supabase
      .from('categoriesConfig')
      .upsert({
        name: category.name,
        description: category.description,
        active: category.active,
        type: "fixed",
      })
  )
  
  try {
    await Promise.all(promises)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update categories' }, { status: 500 })
  }
} 