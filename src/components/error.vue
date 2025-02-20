<template>
    <div class="error-container">
      <div class="error-message">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <style scoped lang="scss">
  @use "../assets/css/variables";
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    padding: 20px;
    
   
    
  }
  
  .error-message {
    color: variables.$primary-color; 
    font-weight: 500;
    font-size: 1.5rem ;
    text-align: center;
  }
  </style>