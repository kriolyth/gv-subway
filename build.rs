use std::process::Command;

fn export_git_commit_count() {

    let num_commits: u32 = match std::env::var("GIT_NUM_COMMITS") {
        Ok(result) => result.parse().unwrap_or(0),
        Err(_) => {
            let output = Command::new("git")
                .args(&["rev-list", "--count", "HEAD"])
                .output()
                .expect("Failed to execute git command");
            String::from_utf8_lossy(&output.stdout).trim().parse::<u32>().unwrap_or(0)
        }
    };
    if num_commits == 0 {
        println!("cargo:rustc-env=PACKAGE_VERSION=0.x");
    } else {
        let mut version = format!("{:.5}", (num_commits as f32).log(7.2));
        let sub_ver = version.split_off(version.len() - 3);
        println!("cargo:rustc-env=PACKAGE_VERSION={version}.{sub_ver}");
    }
}

fn main() {
    export_git_commit_count();
    println!("cargo:rerun-if-changed=build.rs");
}