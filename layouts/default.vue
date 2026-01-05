<template>
  <div class="min-h-screen flex flex-col">
    <LayoutNavbar />
    <main class="flex-grow pt-20">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
