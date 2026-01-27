# AI Builder 快速开始指南

## 🎯 核心概念

AI Builder 是一个通过对话生成组件的系统，核心流程：

```
用户对话 → AI 理解需求 → 匹配组件 → 生成代码 → 实时预览 → 注册到项目
```

## 🏃 快速开始（最小可行版本）

### Step 1: 创建基础 API 路由

创建 `/app/api/ai-builder/chat/route.ts`：

```typescript
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { message, conversationHistory = [] } = await req.json()
  
  // 构建对话历史
  const messages = [
    {
      role: "system",
      content: `你是一个 React/TypeScript 组件生成助手。
项目使用 Next.js 16 + React 19 + TypeScript + Tailwind CSS。
组件库基于 shadcn/ui 风格。
请根据用户需求生成符合规范的代码。`
    },
    ...conversationHistory,
    { role: "user", content: message }
  ]
  
  // 调用 OpenAI API
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages,
    temperature: 0.7,
  })
  
  return NextResponse.json({
    message: completion.choices[0].message.content,
  })
}
```

### Step 2: 创建前端对话界面

创建 `/components/ai-builder/chat-interface.tsx`：

```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  
  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)
    
    try {
      const res = await fetch("/api/ai-builder/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages,
        }),
      })
      
      const data = await res.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <div className={`inline-block p-2 rounded ${
              msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div>AI 正在思考...</div>}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="描述你需要的组件..."
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={loading}>
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}
```

### Step 3: 创建主页面

创建 `/app/ai-builder/page.tsx`：

```typescript
import { ChatInterface } from "@/components/ai-builder/chat-interface"

export default function AIBuilderPage() {
  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-3xl font-bold p-4">AI Builder</h1>
      <div className="h-[calc(100vh-80px)]">
        <ChatInterface />
      </div>
    </div>
  )
}
```

### Step 4: 环境变量配置

在 `.env.local` 中添加：

```bash
OPENAI_API_KEY=your_api_key_here
```

## 🔧 进阶功能实现

### 1. 需求分析功能

创建 `/app/api/ai-builder/analyze/route.ts`：

```typescript
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { requirements } = await req.json()
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `分析用户需求，提取以下信息：
1. 组件类型 (ui/block/example)
2. 核心功能列表
3. 样式需求
4. 依赖组件
5. 缺失信息

返回 JSON 格式。`
      },
      {
        role: "user",
        content: `需求：${requirements}`
      }
    ],
    response_format: { type: "json_object" },
  })
  
  return NextResponse.json(JSON.parse(completion.choices[0].message.content || "{}"))
}
```

### 2. 代码生成功能

创建 `/app/api/ai-builder/generate/route.ts`：

```typescript
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { Project, ScriptKind } from "ts-morph"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { requirements } = await req.json()
  
  // 1. 获取组件库信息
  const componentLibrary = await getComponentLibrary()
  
  // 2. 调用 LLM 生成代码
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `生成 React/TypeScript 组件代码。
使用 TypeScript、Tailwind CSS。
遵循 shadcn/ui 代码风格。
可用组件：${JSON.stringify(componentLibrary)}`
      },
      {
        role: "user",
        content: `需求：${JSON.stringify(requirements)}`
      }
    ],
  })
  
  const code = completion.choices[0].message.content || ""
  
  // 3. 使用 ts-morph 验证和格式化代码
  const project = new Project()
  const sourceFile = project.createSourceFile("temp.tsx", code, {
    scriptKind: ScriptKind.TSX,
  })
  
  // 验证代码
  const diagnostics = project.getPreEmitDiagnostics()
  const errors = diagnostics.filter(d => d.getCategory() === DiagnosticCategory.Error)
  
  if (errors.length > 0) {
    return NextResponse.json({
      error: "代码生成失败",
      errors: errors.map(e => e.getMessageText()),
    }, { status: 400 })
  }
  
  // 4. 提取依赖
  const imports = sourceFile.getImportDeclarations()
  const dependencies = imports.map(imp => imp.getModuleSpecifierValue())
  
  return NextResponse.json({
    code: sourceFile.getFullText(),
    dependencies,
  })
}
```

### 3. 实时预览功能

创建 `/app/preview/page.tsx`：

```typescript
"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const code = searchParams.get("code") || ""
  const [Component, setComponent] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!code) return
    
    try {
      // 动态编译代码（注意：生产环境需要使用更安全的方式）
      const compiled = `
        ${code}
        return ${extractComponentName(code)}
      `
      
      // 这里需要使用安全的代码执行方式
      // 例如使用 VM2 或 iframe sandbox
      const component = eval(compiled)
      setComponent(component)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    }
  }, [code])
  
  if (error) {
    return <div className="p-4 text-red-500">错误：{error}</div>
  }
  
  if (!Component) {
    return <div className="p-4">加载中...</div>
  }
  
  return (
    <div className="p-4">
      <Component />
    </div>
  )
}

function extractComponentName(code: string): string {
  // 简单的组件名提取逻辑
  const match = code.match(/export\s+(?:default\s+)?function\s+(\w+)/)
  return match ? match[1] : "Component"
}
```

## 📦 依赖安装

```bash
# 核心依赖
pnpm add openai
pnpm add ts-morph

# 前端组件（如果还没有）
pnpm add @monaco-editor/react
pnpm add react-markdown

# 可选：向量数据库（用于 RAG）
pnpm add @pinecone-database/pinecone
# 或
pnpm add chromadb
```

## 🎨 UI 组件使用

如果项目已有 shadcn/ui 组件，可以直接使用：

```bash
# 添加需要的组件
npx shadcn@latest add button
npx shadcn@latest add textarea
npx shadcn@latest add card
npx shadcn@latest add tabs
```

## 🔐 安全注意事项

1. **代码执行安全**：预览功能中的代码执行必须使用沙箱环境
2. **API 密钥保护**：永远不要在前端暴露 API 密钥
3. **输入验证**：所有用户输入都需要验证和清理
4. **速率限制**：对 API 调用实施速率限制

## 📚 下一步

1. 阅读完整方案：`AI_BUILDER_ULTIMATE_PLAN.md`
2. 实现组件匹配引擎
3. 实现 Registry 自动集成
4. 优化 AI Prompt 工程
5. 添加错误处理和用户反馈

## 💡 提示

- 从最小可行版本开始，逐步添加功能
- 先实现核心流程，再优化细节
- 使用 TypeScript 确保类型安全
- 编写测试确保代码质量
- 收集用户反馈持续改进

