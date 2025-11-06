# SocialHub Frontend Improvements Guide

This document outlines all the improvements made to the SocialHub application and how to use them.

## 🎯 Improvements Summary

### 1. ✅ Reusable Form Components

**Location:** `src/components/shared/`

Three new form components that handle validation display automatically:

#### FormInput

```tsx
import { FormInput } from "@/components/shared/FormComponents";

<FormInput
  id="email"
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
  error={errors.email}
  register={register}
/>;
```

#### FormTextarea

```tsx
import { FormTextarea } from "@/components/shared/FormComponents";

<FormTextarea
  id="description"
  label="Description"
  placeholder="Enter description"
  rows={5}
  required
  error={errors.description}
  register={register}
/>;
```

#### FormSelect

```tsx
import { FormSelect } from "@/components/shared/FormComponents";

<FormSelect
  id="gender"
  label="Gender"
  placeholder="Select gender"
  options={[
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ]}
  error={errors.gender}
  register={register}
/>;
```

---

### 2. ✅ Validation Schemas

**Location:** `src/schemas/`

#### Auth Schemas (`authSchema.ts`)

- `loginSchema` - Login form validation
- `registerSchema` - Registration with password matching

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/authSchema";

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

#### Post Schemas (`postSchema.ts`)

- `postSchema` - Post creation validation
- `commentSchema` - Comment validation

#### Profile Schema (`profileSchema.ts`)

- `profileEditSchema` - Profile editing with URL and phone validation

#### Group Schema (`groupSchema.ts`)

- `groupSchema` - Comprehensive group creation (already implemented)

---

### 3. ✅ Error Boundary

**Location:** `src/components/shared/ErrorBoundary.tsx`

Wrap your components to catch and handle errors gracefully:

```tsx
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Or with custom fallback
<ErrorBoundary fallback={<CustomErrorPage />}>
  <YourComponent />
</ErrorBoundary>
```

**Recommended Usage:**

- Wrap each route in `AppRoutes.tsx`
- Wrap the entire app in `App.tsx`
- Wrap complex components that might fail

---

### 4. ✅ Loading Skeletons

**Location:** `src/components/shared/Skeletons.tsx`

Pre-built skeleton components for various UI elements:

```tsx
import {
  GroupCardSkeleton,
  ProfileHeaderSkeleton,
  NotificationSkeleton,
  MessageSkeleton,
  CommentSkeleton,
} from "@/components/shared/Skeletons";

// Usage
{
  isLoading ? <GroupCardSkeleton /> : <GroupCard data={group} />;
}

// Multiple skeletons
{
  isLoading &&
    Array(5)
      .fill(0)
      .map((_, i) => <GroupCardSkeleton key={i} />);
}
```

---

### 5. ✅ Image Utilities

**Location:** `src/utils/imageUtils.ts`

Complete image processing pipeline with validation, compression, and resizing:

```tsx
import { processImage, validateImage } from "@/utils/imageUtils";

// Simple validation
const validation = validateImage(file, {
  maxSizeMB: 5,
  allowedTypes: ["image/jpeg", "image/png"],
});

if (!validation.valid) {
  showToast.error(validation.error);
  return;
}

// Complete processing (validate + compress + convert to base64)
const result = await processImage(file, {
  maxSizeMB: 5,
  maxWidth: 1920,
  maxHeight: 1920,
});

if (result.valid) {
  setImagePreview(result.data); // base64 string
} else {
  showToast.error(result.error);
}
```

**Update CreateGroupPage to use this:**

```tsx
const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  type: "cover" | "profile"
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const result = await processImage(file, { maxSizeMB: 5 });

  if (result.valid && result.data) {
    if (type === "cover") {
      setCoverPreview(result.data);
    } else {
      setProfilePreview(result.data);
    }
    showToast.success("Image uploaded successfully!");
  } else {
    showToast.error(result.error || "Failed to process image");
  }
};
```

---

### 6. ✅ Debouncing Hooks

**Location:** `src/hooks/`

#### useDebounce (for values)

```tsx
import { useDebounce } from "@/hooks/useDebounce";

const [searchTerm, setSearchTerm] = useState("");
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  // This only runs 500ms after user stops typing
  if (debouncedSearch) {
    performSearch(debouncedSearch);
  }
}, [debouncedSearch]);
```

#### useDebouncedCallback (for functions)

```tsx
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

const { debouncedCallback } = useDebouncedCallback((value: string) => {
  console.log("Searching for:", value);
  performSearch(value);
}, 500);

<input onChange={(e) => debouncedCallback(e.target.value)} />;
```

**Update Search Page:**

```tsx
// In src/pages/Search.tsx
const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 500);

useEffect(() => {
  if (debouncedQuery) {
    // Perform search with debounced value
    dispatch(searchAction(debouncedQuery));
  }
}, [debouncedQuery]);
```

---

### 7. ✅ Accessibility Hooks

**Location:** `src/hooks/useAccessibility.ts`

#### useFocusTrap (for modals)

```tsx
import { useFocusTrap } from "@/hooks/useAccessibility";

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useFocusTrap(isOpen);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
};
```

#### useRestoreFocus

```tsx
import { useRestoreFocus } from "@/hooks/useAccessibility";

const Modal = () => {
  useRestoreFocus(); // Automatically restores focus on unmount

  return <div>Modal content</div>;
};
```

#### useKeyboardNavigation (for dropdowns/lists)

```tsx
import { useKeyboardNavigation } from "@/hooks/useAccessibility";

const { handleKeyDown } = useKeyboardNavigation(items.length, (index) => {
  selectItem(items[index]);
});

<div onKeyDown={handleKeyDown}>{/* Your navigable items */}</div>;
```

---

## 📋 Next Steps & Recommendations

### Immediate Actions:

1. **Update CreateGroupPage** ✨
   - Already done! Uses react-hook-form + zod

2. **Add ErrorBoundary to Routes**

   ```tsx
   // In src/routes/AppRoutes.tsx
   import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

   <Route
     path="/groups"
     element={
       <ErrorBoundary>
         <Groups />
       </ErrorBoundary>
     }
   />;
   ```

3. **Update Login/Register Pages**
   - Use `authSchema.ts` validators
   - Use `FormInput` components
   - Replace SweetAlert2 with toast

4. **Update Search Page**
   - Add `useDebounce` hook
   - Add loading skeleton

5. **Update Profile Edit**
   - Use `profileEditSchema`
   - Use form components
   - Add image optimization

6. **Update Post Creation**
   - Use `postSchema`
   - Add image optimization
   - Add loading states

---

## 🎨 Code Quality Improvements

### Already Implemented:

✅ TypeScript strict types  
✅ Form validation with Zod  
✅ Error boundaries  
✅ Loading states  
✅ Image optimization  
✅ Performance optimization (debouncing)  
✅ Accessibility patterns  
✅ Reusable components

### Still Needed:

❌ Redux Toolkit async thunks for API calls  
❌ React Query for server state (optional)  
❌ Unit tests  
❌ E2E tests  
❌ Storybook for component documentation

---

## 🚀 Performance Tips

1. **Lazy load routes:**

   ```tsx
   const Groups = lazy(() => import("@/pages/Groups"));
   ```

2. **Memoize expensive components:**

   ```tsx
   const MemoizedGroupCard = memo(GroupCard);
   ```

3. **Use virtualization for long lists:**

   ```tsx
   import { FixedSizeList } from "react-window";
   ```

4. **Optimize images on upload** (already done!)

5. **Debounce search/filter inputs** (already done!)

---

## 📚 Resources

- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/
- React Hot Toast: https://react-hot-toast.com/
- Accessibility: https://www.w3.org/WAI/ARIA/apg/

---

## 🐛 Common Issues & Solutions

### Issue: Form not validating

**Solution:** Make sure you're using `zodResolver` and passing `errors` object

### Issue: Toast not showing

**Solution:** Check that `<Toaster />` is in your App.tsx

### Issue: Image too large

**Solution:** Use `processImage()` instead of direct file upload

### Issue: TypeScript errors in forms

**Solution:** Use the exported types (`LoginFormData`, `GroupFormData`, etc.)

---

Generated: November 2025
