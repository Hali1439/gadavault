# Task: Fix Hydration Mismatch Error in Header Button Nesting

## Steps to Complete:

1. [x] Update Button.tsx to support `asChild` prop for polymorphic rendering using `React.cloneElement` to apply styles to child elements like Link without nesting.
   - Added `asChild?: boolean` to props.
   - Implemented cloneElement logic with type assertions to handle TS issues.
   - Removed href branch to simplify (asChild handles links).
   - Verified no TS errors in Button itself.

2. [x] Update Header.tsx to use `asChild` for login/signup buttons.
   - Change `<Link><Button>Text</Button></Link>` to `<Button asChild><Link>Text</Link></Button>`.
   - This applies Button styles directly to the <a> from Link, avoiding invalid nesting.

3. [x] Test the changes.
   - Restart dev server: `npm run dev`.
   - Navigate to signup page, register (simulate success to redirect to /portfolio, which may hit 404).
   - Verify no hydration errors in console.
   - Check Header renders correctly for guest users (login/signup buttons styled as before, no nesting).
   - Test other Button usages (e.g., grid menu, profile) remain functional.

4. [x] Optional: If /portfolio doesn't exist and causes 404, create a stub page or adjust redirect in AuthForm.tsx.
   - But focus on hydration fix first.

5. [x] Mark complete and attempt_completion.
