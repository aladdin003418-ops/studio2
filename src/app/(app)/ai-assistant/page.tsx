"use client";

import { useFormState } from "react-dom";
import { Code, Bot, Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCodeSuggestionsAction, type FormState } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const initialState: FormState = {
  result: null,
  error: null,
};

const languages = [
  { value: "javascript", label: "جاوااسکریپت" },
  { value: "python", label: "پایتون" },
  { value: "typescript", label: "تایپ‌اسکریپت" },
  { value: "java", label: "جاوا" },
  { value: "csharp", label: "سی‌شارپ" },
  { value: "go", label: "گو" },
  { value: "ruby", label: "روبی" },
];

export default function AiAssistantPage() {
  const [state, formAction] = useFormState(
    getCodeSuggestionsAction,
    initialState
  );

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-4">
        <Bot className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-bold">دستیار کدنویسی هوش مصنوعی</h1>
      </header>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentCode">کد شما</Label>
              <Textarea
                id="currentCode"
                name="currentCode"
                placeholder="کد خود را اینجا قرار دهید..."
                className="min-h-[150px] font-mono text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="programmingLanguage">زبان</Label>
                <Select name="programmingLanguage" defaultValue="javascript">
                  <SelectTrigger id="programmingLanguage">
                    <SelectValue placeholder="زبان را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value} className="capitalize">
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="userQuery">درخواست خاص (اختیاری)</Label>
                <Input
                  id="userQuery"
                  name="userQuery"
                  placeholder="مثلا: 'این کد را ریفکتور کن'"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              <Lightbulb className="ml-2 h-4 w-4" />
              دریافت پیشنهادات
            </Button>
          </form>

          {state.error && (
             <Alert variant="destructive">
               <AlertTitle>خطا</AlertTitle>
               <AlertDescription>{state.error}</AlertDescription>
             </Alert>
          )}

          {state.result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot /> پیشنهادات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">توضیحات:</h3>
                  <p className="text-sm text-muted-foreground">{state.result.explanation}</p>
                </div>
                <Separator />
                <div>
                   <h3 className="font-semibold mb-2">پیشنهادات کد:</h3>
                   <div className="space-y-2">
                    {state.result.suggestions.map((suggestion, index) => (
                      <pre key={index} className="bg-muted p-3 rounded-md overflow-x-auto text-sm font-mono text-left" dir="ltr">
                        <code>{suggestion}</code>
                      </pre>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
