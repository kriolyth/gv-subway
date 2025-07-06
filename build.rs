use std::process::Command;

fn export_git_commit_count() {
    let output = Command::new("git")
        .args(&["rev-list", "--count", "HEAD"])
        .output()
        .expect("Failed to execute git command");

    if output.status.success() {
        let maybe_count = String::from_utf8_lossy(&output.stdout).trim().parse::<u32>();
        if let Ok(count) = maybe_count {      
            let mut version = format!("{:.5}", (count as f32).log(7.2));
            let sub_ver = version.split_off(version.len() - 3);
            println!("cargo:rustc-env=PACKAGE_VERSION={version}.{sub_ver}");
        } else {
            println!("cargo:rustc-env=PACKAGE_VERSION=1.x");
        }
    } else {
        println!("cargo:warning=Could not determine git commit count");
    }
}

fn main() {
    export_git_commit_count();
    println!("cargo:rerun-if-changed=build.rs");
}